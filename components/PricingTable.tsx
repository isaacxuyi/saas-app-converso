"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 companion",
      "Basic voice conversations",
      "Limited subjects",
      "Community support"
    ]
  },
  {
    name: "Basic",
    price: "$9.99",
    period: "month",
    features: [
      "5 companions",
      "Advanced voice conversations",
      "All subjects",
      "Email support",
      "Progress tracking"
    ]
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "month",
    features: [
      "Unlimited companions",
      "Premium voices",
      "All subjects + custom topics",
      "Priority support",
      "Advanced analytics",
      "Custom personalities"
    ]
  }
]

const PricingTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Plan</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan.name}>
              <TableCell className="font-medium">{plan.name}</TableCell>
              <TableCell>
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-sm text-muted-foreground">per {plan.period}</div>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-right">
                <Button variant={plan.name === "Free" ? "outline" : "default"}>
                  {plan.name === "Free" ? "Get Started" : "Subscribe"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PricingTable