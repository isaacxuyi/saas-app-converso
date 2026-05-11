"use client"

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "all";

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";

    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"]
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }

    router.push(newUrl, { scroll: false });
  }, [subject, router, searchParams]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className='input capitalize'>
        <SelectValue placeholder='Select subject' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All subjects</SelectItem>
        {subjects.map((subjectOption) => (
          <SelectItem key={subjectOption} value={subjectOption} className='capitalize'>
            {subjectOption}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SubjectFilter