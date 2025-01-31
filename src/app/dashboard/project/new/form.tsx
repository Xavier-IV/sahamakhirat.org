"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createProject, CreateProjectState } from "./action";
import { useState } from "react";

const initialState: CreateProjectState | void = {
  errors: {},
  message: "",
  values: {
    projectName: "",
    projectDescription: "",
    projectWebsite: "",
  },
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File must be 5MB or less");
      setFile(null);
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  };

  return (
    <form action={formAction} className="space-y-6">
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
          defaultValue={state?.values.projectName} // ✅ Keep previous value
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
          defaultValue={state?.values.projectDescription} // ✅ Keep previous value
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
          defaultValue={state?.values.projectWebsite} // ✅ Keep previous value
        />
        {state?.errors?.projectWebsite && (
          <p className="text-red-500 text-sm">{state.errors.projectWebsite}</p>
        )}
      </div>

      {/* Project Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Image
        </label>
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="max-w-md"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {file.name}
          </p>
        )}
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
