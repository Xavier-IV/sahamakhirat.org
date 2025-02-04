"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useActionState, useState } from "react";
import { updateProject, UpdateProjectState } from "./action";

const initialState: UpdateProjectState = {
  errors: {},
  message: "",
  values: {
    projectName: "",
    projectDescription: "",
    projectWebsite: "",
    projectReadme: "",
  },
};

type EditProjectFormProps = {
  userId: string;
  imageUrl: string | null;
  project: {
    id: string;
    title: string;
    description: string;
    website: string;
    image_url: string;
    readme: string;
  };
};

export function EditProjectForm({
  userId,
  project,
  imageUrl,
}: EditProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProject,
    initialState,
  );
  const [previewImage, setPreviewImage] = useState(imageUrl);
  const [, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File must be 5MB or less");
      setFile(null);
      return;
    }

    setFileError(null);
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="projectId" value={project.id} />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <Input
          name="projectName"
          required
          className="max-w-md"
          defaultValue={project.title}
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
          defaultValue={project.description}
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
          defaultValue={project.website}
        />
        {state?.errors?.projectWebsite && (
          <p className="text-red-500 text-sm">{state.errors.projectWebsite}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Image
        </label>
        <div className="mb-4">
          <img
            src={previewImage || "/placeholder.svg"}
            alt="Project Image"
            width={400}
            height={200}
            className="rounded-md border border-gray-300"
          />
        </div>
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="max-w-md"
        />
        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
        {state?.errors?.image && (
          <p className="text-red-500 text-sm">{state.errors.image}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project README (Markdown)
        </label>
        <Textarea
          name="projectReadme"
          className="max-w-md"
          defaultValue={project.readme}
          rows={10}
        />
        {state?.errors?.projectReadme && (
          <p className="text-red-500 text-sm">{state.errors.projectReadme}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <div className="flex gap-2 w-full max-w-md items-end justify-end pt-4">
        <Button variant="secondary" asChild>
          <Link href={`/dashboard`}>Cancel</Link>
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Updating..." : "Update Project"}
        </Button>
      </div>
    </form>
  );
}
