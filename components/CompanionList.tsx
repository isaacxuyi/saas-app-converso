import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Companion } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListprops {
  title: string;
  companions?: Companion[];
  className?: string;
}

const CompanionList = ({ title, companions, className }: CompanionsListprops) => {
  return (
    <article className={cn("companion-list", className)}>
      <h2 className="font-bold text-2xl">Recent sessions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-lg">Lesson</TableHead>
            <TableHead className="w-[140px] text-lg text-right">Subject</TableHead>
            <TableHead className="w-[90px] text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => {
            // 1. Debug: Log the subject to see exactly what is causing the break
            console.log("Subject value for ID", id, ":", subject);

            // 2. Safe Fallback: Check if subject exists, and append the extension. 
            // Adjust ".svg" to whatever file type your icons actually are (.png, .jpg).
            // Make sure you have a default icon file in your public/icons folder!
            const imageSrc = subject ? `/icons/${subject}.svg` : '/icons/default.svg';

            return (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-2">
                      <div>
                        <Image 
                          src={imageSrc} 
                          alt={subject || "Default Subject"} 
                          width={35} 
                          height={35} 
                        />
                      </div>
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;