'use client'
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Card, Progress, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

type VideoData = {
	attributes: { title: string, slug: string };
};

export default function VideoPage() {
	const strapiUrl: string | undefined = process.env.STRAPI_URL;

	const fetcher = (url: string) => axios.get(url).then(res => res.data)
	const { data, error } = useSWR(`${strapiUrl}/api/videos`, fetcher)

	return (
		<>
			{error && <Divider className="h-1 bg-red-900" />}
			{!data &&
				<div>
					<Progress
						isIndeterminate
						size="sm"
						aria-label="Loading..."
						className="absolute"
						classNames={{
							track: "h-1 drop-shadow-md border border-default",
							indicator: "bg-gradient-to-r from-pink-500 to-purple-500",
						}}

						value={100}
					/>
				</div>
			}

			{data &&
				<div>
					<div className="flex-1 transition-all duration-500">
						<div className="grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] pt-6 px-8 overflow-x-hidden">
							{data["data"].map((video: VideoData, index: number) => (
								<a key={index} href={`video/${video.attributes.slug}`} className="w-full">
									<div className="video w-full cursor-pointer h-fit">
										<div className="video__thumbnail relative">
											<img
												src="https://i.ytimg.com/vi/OqZW54a54-g/mqdefault.jpg"
												className="rounded-xl w-full"
												alt="video thumbnail"
											/>
											<div className="absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white">
												12:23
											</div>
										</div>
										<div className="video__details pt-4 dark:text-white">
											<div className="flex gap-2">
												<div className="channel-logo flex flex-shrink-0">
													<img
														className="rounded-[50%] w-10 h-10 object-cover"
														alt="channel logo"
														src="https://yt3.ggpht.com/ytc/APkrFKattepq9SbKHkI09O1H5ctalvWfPq9YKP5_mHPULg=s88-c-k-c0x00ffffff-no-rj"
													/>
												</div>
												<div className="video-detail">
													<div className="line-clamp-2 video-title font-semibold text-base leading-snug">
														{video.attributes.title}
													</div>
													<div className="channel-name text-xs pt-2">Slayy Point</div>
													<div className="text-xs pt-1">
														<span>2.1M views</span>
														<span> • </span>
														<span>a day ago</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			}

		</>
	);
}
