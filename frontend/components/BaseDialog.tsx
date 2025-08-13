"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BaseDialogProps {
  isOpen: boolean;
  setisOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  isOpen,
  setisOpen,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
