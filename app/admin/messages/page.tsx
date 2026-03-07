"use client"

import { useEffect, useMemo, useState } from "react"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { AdminPageHeader } from "@/components/admin/page-header"
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog"
import { StatusBadge } from "@/components/admin/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { parseApiResponse } from "@/lib/admin-api"
import type { Message, MessageStatus } from "@/lib/admin-types"

type MessageListResponse = {
  data: Message[]
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const loadMessages = async () => {
    try {
      const response = await fetch("/api/messages", { cache: "no-store" })
      const payload = await parseApiResponse<MessageListResponse>(response)
      setMessages(payload.data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const q = query.toLowerCase()
      return (
        message.customerName.toLowerCase().includes(q) ||
        message.email.toLowerCase().includes(q) ||
        (message.product?.name?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [messages, query])

  const updateStatus = async (id: string, status: MessageStatus) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      await parseApiResponse(response)
      toast.success("Message status updated")
      await loadMessages()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update status")
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" })
      await parseApiResponse(response)
      toast.success("Message deleted")
      await loadMessages()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete message")
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="View and manage customer messages and quote requests."
      />

      <Card className="mb-4">
        <CardContent className="p-4">
          <Input
            placeholder="Search by customer, email, or product"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                    Loading messages...
                  </TableCell>
                </TableRow>
              ) : filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-20 text-center text-muted-foreground">
                    No messages found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.customerName}</TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        <p>{message.email}</p>
                        <p>{message.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[320px] whitespace-normal text-sm text-muted-foreground">
                      {message.message}
                    </TableCell>
                    <TableCell>
                      {message.product ? `${message.product.name} (${message.product.productCode})` : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge type="message" value={message.status} />
                    </TableCell>
                    <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {message.status === "UNREAD" ? (
                              <DropdownMenuItem onClick={() => updateStatus(message.id, "READ")}>
                                Mark as Read
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => updateStatus(message.id, "UNREAD")}>
                                Mark as Unread
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DeleteConfirmDialog
                          title="Delete Message"
                          description="This action cannot be undone."
                          onConfirm={() => deleteMessage(message.id)}
                          trigger={
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
