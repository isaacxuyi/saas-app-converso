import {
Table,
TableBody,
TableCaption,
TableCell,
TableHead,
TableHeader,
TableFooter,
TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { Companion } from "@/types";
import Link from "next/link";

interface CompanionsListprops {
  title: string;
  companions?: Companion[];
  className?: string;

}

const CompanionList = ({title, companions, className}: CompanionsListprops) => {
  return (
   <article className={cn("companion-list", className)}>
    <h2 className="font-bold text-2xl" >Recent sessions</h2>
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px] text-lg">Lesson</TableHead>
      <TableHead className="w-[140px] text-lg text-right">Subject</TableHead>
      <TableHead className="w-[90px] text-lg text-right">Duration</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {companions ?.map(({id, subject, name, topic, duration}) => (
        <TableRow key={id}>
          <TableCell>
            <Link href={`/companions/${id}`}>
            <div className="flex item-center gap-2">
              
            </div>
            </Link>
          </TableCell>
        </TableRow>
      ))}


  </TableBody>
</Table>

   </article>
  )
}

export default CompanionList
  