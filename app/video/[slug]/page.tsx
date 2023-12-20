export default function Page({ params }: { params: { slug: string } }) {

    return <div>
        <div className="min-h-[calc(100vh-4.62rem)] dark:text-white grid grid-cols-12 md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 false">

            <div className="col1 col-span-12 lg:col-span-8  ">
                <div className="video mb-4 ">
                    <div className="player mb-4">
                        <div className="rounded-md align-middle overflow-hidden w-full aspect-video">
                        <video className="min-w-full" controls src="http://localhost:1337/uploads/9559117_65d02ac6ad.mp4"></video>
                        </div>
                    </div>

                        <div className="video_data">
                            <div className="video_title font-bold text-lg mb-2">
                                Test Titel
                            </div>
                            <div className="channel_video_stats flex justify-between flex-wrap gap-y-4 gap-2 items-center">
                                <div className="channel_details flex gap-2 items-center">
                                    123
                                </div>

                                <div className="video_stats flex items-center flex-wrap gap-2 text-sm">
                                    456
                                </div>


                            </div>

                            <div className="video_desc mt-4 text-sm p-4 bg-gray-100 dark:bg-zinc-700 rounded-xl">
                                <div className="view_date flex gap-4 font-bold pb-1">
                                    <div className="video_views ">43M views</div>
                                    <div className="published_date">2 days ago</div>
                                </div>
                                <div className="desc whitespace-pre-wrap break-words ">
                                    Get ready to embark on this emotional rollercoaster of the most amazing journey ever taken, as we pr...
                                    <button className="font-bold block">Show More</button>
                                </div>
                            </div>
                        </div>

                    

                </div>


            </div>

            <div className="col2 col-span-12 lg:col-span-4 ">
asdf
            </div>

        </div>

    </div>
}