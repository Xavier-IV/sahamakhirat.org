"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { updateProject, UpdateProjectState } from "./action";

const initialState: UpdateProjectState = {
  errors: {},
  message: "",
  values: {
    projectName: "",
    projectDescription: "",
    projectWebsite: "",
  },
};

type EditProjectFormProps = {
  userId: string;
  project: {
    id: string;
    title: string;
    description: string;
    website: string;
  };
};

export function EditProjectForm({ userId, project }: EditProjectFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProject,
    initialState,
  );

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

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Updating..." : "Update Project"}
      </Button>
    </form>
  );
}
