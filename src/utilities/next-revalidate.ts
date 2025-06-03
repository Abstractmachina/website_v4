export const revalidate = async (tags: string[]): Promise<void> => {
	console.log("revalidate", tags.toString());
	if (
		!process.env.REVALIDATE_NEXT_CACHE_URL ||
		!process.env.REVALIDATE_CACHE_SECRET_TOKEN
	) {
		return;
	}

	try {
		for (const tag of tags) {
			const res = await fetch(process.env.REVALIDATE_NEXT_CACHE_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: process.env.REVALIDATE_CACHE_SECRET_TOKEN,
					tag,
				}),
			});
			if (!res.ok) {
				const json = await res.json();
				console.log(json);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

export const revalidateArt = async (tags: string[]): Promise<void> => {
	console.log("revalidate", tags.toString());
	if (
		!process.env.REVALIDATE_ART_NEXT_CACHE_URL ||
		!process.env.REVALIDATE_CACHE_SECRET_TOKEN
	) {
		return;
	}

	try {
		for (const tag of tags) {
			const res = await fetch(process.env.REVALIDATE_ART_NEXT_CACHE_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					secret: process.env.REVALIDATE_CACHE_SECRET_TOKEN,
					tag,
				}),
			});
			if (!res.ok) {
				const json = await res.json();
				console.log(json);
			}
		}
	} catch (error) {
		console.log(error);
	}
};
