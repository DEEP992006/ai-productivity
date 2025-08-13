"use client";

import React, { useEffect, useState } from "react";

interface ShowDateProps {
  date: Date;
}

export const ShowDate: React.FC<ShowDateProps> = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const clientDate = new Date(date);
    const localString = clientDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setFormattedDate(localString);
  }, [date]);

  return (
    <span>
      {formattedDate}
    </span>
  );
};
