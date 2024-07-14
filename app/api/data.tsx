/** @format */

import { Post, User } from "@/lib/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface DataProps {
	posts: Post[];
	users: User[];
}

export const getServerSideProps: GetServerSideProps<DataProps> = async () => {
	const [postsRes, usersRes] = await Promise.all([
		fetch("https://jsonplaceholder.typicode.com/posts", {
			headers: {
				"Cache-Control":
					"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
			},
		}),
		fetch("https://jsonplaceholder.typicode.com/users", {
			headers: {
				"Cache-Control":
					"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
			},
		}),
	]);

	const [posts, users] = await Promise.all([postsRes.json(), usersRes.json()]);

	return {
		props: {
			posts,
			users,
		},
	};
};

const Page: NextPage<DataProps> = ({ posts, users }) => {
	return (
		<div>
			<h1>Posts</h1>
			<pre>{JSON.stringify(posts, null, 2)}</pre>
			<h1>Users</h1>
			<pre>{JSON.stringify(users, null, 2)}</pre>
		</div>
	);
};

export default Page;
