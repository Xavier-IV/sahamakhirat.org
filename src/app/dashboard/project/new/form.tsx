"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useActionState, useEffect, useState } from "react";
import { createProject, CreateProjectState } from "./action";

const initialState: CreateProjectState | void = {
  errors: {},
  message: "",
  values: {
    projectName: "",
    projectDescription: "",
    projectWebsite: "",
    projectReadme: "",
  },
  imageUrl: "https://placehold.co/400x200",
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
      formData.append("image", file, file.name);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="userId" value={userId} />

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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Image
        </label>
        <div className="flex flex-col gap-4">
          <img
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Readme (Markdown)
        </label>
        <Textarea
          name="projectReadme"
          className="max-w-md"
          placeholder="Paste your project README in markdown format here..."
          rows={10}
          defaultValue={state?.values.projectReadme}
        />
        {state?.errors?.projectReadme && (
          <p className="text-red-500 text-sm">{state.errors.projectReadme}</p>
        )}
      </div>

      <label className="flex text-sm text-gray-900 gap-2 max-w-md">
        <Checkbox name="intention" required className="mt-0.5" />
        <span>
          I confirm my intention to contribute to this project for the sake of
          Allah and to earn rewards in the Akhirah.
        </span>
      </label>

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="w-full max-w-md flex items-end justify-end pt-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Submit Project"}
        </Button>
      </div>
    </form>
  );
}
