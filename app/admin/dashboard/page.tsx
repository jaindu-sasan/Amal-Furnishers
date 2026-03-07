import Link from "next/link"
import { FolderTree, MessageSquare, Package, Plus } from "lucide-react"
import { prisma } from "@/backend/db/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminPageHeader } from "@/components/admin/page-header"
import { StatusBadge } from "@/components/admin/status-badge"

export default async function AdminDashboardPage() {
  const [categoryCount, productCount, totalMessages, unreadMessages, recentMessages] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.message.count(),
    prisma.message.count({ where: { status: "UNREAD" } }),
    prisma.message.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            name: true,
            productCode: true,
          },
        },
      },
    }),
  ])

  const stats = [
    {
      title: "Categories",
      value: categoryCount,
      icon: FolderTree,
      href: "/admin/categories",
    },
    {
      title: "Products",
      value: productCount,
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Messages",
      value: totalMessages,
      icon: MessageSquare,
      href: "/admin/messages",
    },
    {
      title: "Unread",
      value: unreadMessages,
      icon: MessageSquare,
      href: "/admin/messages",
    },
  ]

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of admin activity and customer inquiries."
        action={
          <Button asChild className="gap-2">
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted-foreground">{item.title}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Messages</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/messages">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-20 text-center text-muted-foreground">
                    No messages available.
                  </TableCell>
                </TableRow>
              ) : (
                recentMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>{message.customerName}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>
                      {message.product ? `${message.product.name} (${message.product.productCode})` : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge type="message" value={message.status} />
                    </TableCell>
                    <TableCell>{message.createdAt.toLocaleDateString()}</TableCell>
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

