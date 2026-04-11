import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
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
      <h2 className="font-bold text-2xl mb-4">Recent sessions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-lg">Lesson</TableHead>
            {/* Kept text-right to match your original design, or use text-center */}
            <TableHead className="w-[140px] text-lg text-right">Subject</TableHead>
            <TableHead className="w-[90px] text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(({ id, subject, name, topic, duration }) => {
            const imageSrc = subject ? `/icons/${subject}.svg` : '/icons/default.svg';

            return (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" 
                        style={{backgroundColor: getSubjectColor(subject)}} 
                      >
                        <Image 
                          src={imageSrc} 
                          alt={subject || "Default Subject"} 
                          width={35} 
                          height={35} 
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-2xl">{name}</p>
                        <p className="text-sm text-muted-foreground">{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                
                {/* Fixed Alignment: Added text-right to the TableCell and ml-auto to the badge */}
                <TableCell className="text-right">
                  <div className="subject-badge w-fit ml-auto max-md:hidden">
                    {subject} 
                  </div>
                  <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden ml-auto" style={{backgroundColor: getSubjectColor(subject)}}>
                    <Image src={imageSrc}
                      alt={subject || "Default Subject"}
                      width={18}
                      height={18}
                    />
                  </div>
                </TableCell>

                <TableCell className="text-right font-medium">
                  {duration}
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