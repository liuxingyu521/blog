import type { CollectionEntry } from "astro:content";

export function sortMDByDate(posts: CollectionEntry<"post">[] = []): CollectionEntry<"post">[] {
	return posts.sort(
		(a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf(),
	);
}

export function getYearPosts(posts: CollectionEntry<"post">[] = []) {
	const yearPostsInfo: { [key: string]: CollectionEntry<"post">[] } = posts.reduce((prev, post) => {
		const yearInfo: { [key: string]: CollectionEntry<"post">[] } = { ...prev };
		const year = new Date(post.data.publishDate).getFullYear();
		yearInfo[year] = [...(yearInfo[year] || []), post];
		return yearInfo;
	}, {});

	const result = Object.keys(yearPostsInfo).map((year) => ({ year, posts: yearPostsInfo[year]! }));
	result.sort((a, b) => (a.year < b.year ? 1 : -1));

	return result;
}

export function getUniqueTags(posts: CollectionEntry<"post">[] = []) {
	const uniqueTags = new Set<string>();
	posts.forEach((post) => {
		post.data.tags.map((tag: string) => uniqueTags.add(tag));
	});
	return Array.from(uniqueTags);
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[] = []): {
	name: string;
	count: number;
}[] {
	const tagsInfo: { [key: string]: number } = posts.reduce((prev, post) => {
		const runningTags: { [key: string]: number } = { ...prev };
		post.data.tags.forEach((tag: string) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});

	const result = Object.keys(tagsInfo).map((tag) => ({ name: tag, count: tagsInfo[tag]! }));
	result.sort((a, b) => (a.count < b.count ? 1 : -1));

	return result;
}
