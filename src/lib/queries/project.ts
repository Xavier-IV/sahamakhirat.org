import { QueryData } from "@supabase/supabase-js";
import { createClient } from "../supabase/client";
import { unstable_cache } from "next/cache";

const supabase = createClient();
const projectsQuery = supabase
	.from("projects")
	.select(
		"id, title, description, image_url, website, readme, contributors(*), maintainers(*)",
		{
			count: "exact",
		},
	)
	.eq("is_approved", true)
	.order("created_at", { ascending: true });

export type ProjectsQuery = QueryData<typeof projectsQuery>;

export const getProjects = unstable_cache(async (start: number, end: number) => {
	return await projectsQuery.range(start, end);
}, ['projects'], { revalidate: 3600, tags: ['projects'] })

export const getOneProject = unstable_cache(async (id: string) => {
	console.log('running');
	return await supabase
		.from("projects")
		.select(
			"id, title, description, image_url, website, readme, maintainers(*), contributors(*)",
		)
		.eq("id", id)
		.single()
}, ['project'], { revalidate: 3600, tags: ['project'] })

export const getAllProjects = unstable_cache(async () => {
	return await supabase
		.from("projects")
		.select("id")
		.eq("is_approved", true)
		.order("created_at", { ascending: true })
}, ['project'], { revalidate: 3600, tags: ['project'] })