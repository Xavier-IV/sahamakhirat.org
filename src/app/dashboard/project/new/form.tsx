"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject, CreateProjectState } from "./action";
import { useState, useEffect, startTransition } from "react";
import Image from "next/image";

const initialState: CreateProjectState | void = {
  errors: {},
  message: "",
  values: {
    projectName: "",
    projectDescription: "",
    projectWebsite: "",
  },
  imageUrl: "https://placehold.co/400x200", // ✅ Default preview
};

type NewProjectFormProps = {
  userId: string;
};

export function NewProjectForm({ userId }: NewProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    state?.imageUrl || "https://placehold.co/400x200",
  );

  // ✅ Update preview image if form state changes
  useEffect(() => {
    setPreviewUrl(state?.imageUrl || "https://placehold.co/400x200");
  }, [state?.imageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File must be 5MB or less");
      setFile(null);
    } else {
      setFileError(null);
      setFile(selectedFile);
      if (selectedFile) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (file) {
      formData.append("image", file, file.name); // ✅ Re-append file if exists
    }

    // ✅ Use startTransition to ensure the action is properly dispatched
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="userId" value={userId} />

      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <Input
          name="projectName"
          required
          className="max-w-md"
          defaultValue={state?.values.projectName}
        />
        {state?.errors?.projectName && (
          <p className="text-red-500 text-sm">{state.errors.projectName}</p>
        )}
      </div>

      {/* Project Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <Textarea
          name="projectDescription"
          required
          className="max-w-md"
          defaultValue={state?.values.projectDescription}
        />
        {state?.errors?.projectDescription && (
          <p className="text-red-500 text-sm">
            {state.errors.projectDescription}
          </p>
        )}
      </div>

      {/* Project Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Website
        </label>
        <Input
          name="projectWebsite"
          type="url"
          required
          className="max-w-md"
          defaultValue={state?.values.projectWebsite}
        />
        {state?.errors?.projectWebsite && (
          <p className="text-red-500 text-sm">{state.errors.projectWebsite}</p>
        )}
      </div>

      {/* Project Image + Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Image
        </label>
        <div className="flex flex-col gap-4">
          <Image
            src={previewUrl}
            alt="Project Preview"
            width={200}
            height={100}
            className="rounded border object-cover"
          />
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="max-w-md"
          />
        </div>
        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
        {state?.errors?.image && (
          <p className="text-red-500 text-sm">{state.errors.image}</p>
        )}
      </div>

      {/* Confirmation Checkbox */}
      <label className="flex text-sm text-gray-900 gap-2 max-w-md">
        <Checkbox name="intention" required className="mt-0.5" />
        <span>
          I confirm my intention to contribute to this project for the sake of
          Allah and to earn rewards in the Akhirah.
        </span>
      </label>

      {/* General Form Error */}
      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit Project"}
      </Button>
    </form>
  );
}
