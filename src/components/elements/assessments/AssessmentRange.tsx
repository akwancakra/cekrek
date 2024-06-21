import { Button } from "@/components/ui/button";

export default function AssessmentRange() {
    return (
        <section className="mx-auto max-w-lg flex flex-col justify-center items-center min-h-svh h-full gap-2 p-2">
            <div className="badge badge-outline badge-neutral">1/20</div>
            <p className="text-gray-500 text-center text-small">
                Expression when getting advice from parents or teachers
            </p>
            {/* <div class="bg-gray-400 rounded-lg w-full h-64"></div> */}
            <div className="w-full my-3">
                <div className="flex justify-between text-center mb-1">
                    <div>
                        <p className="tracking-tighter font-medium text-small">
                            Sedih
                        </p>
                    </div>
                    <div>
                        <p className="tracking-tighter font-medium text-small">
                            Senang
                        </p>
                    </div>
                    <div>
                        <p className="tracking-tighter font-medium text-small">
                            Marah
                        </p>
                    </div>
                </div>
                <input
                    type="range"
                    min={30}
                    max={90}
                    defaultValue={30}
                    className="range range-primary"
                    step={30}
                />
                <div className="w-full flex justify-between text-xs px-0">
                    <span className="text-3xl !leading-none w-fit">🥲</span>
                    <span className="text-3xl !leading-none w-fit">😀</span>
                    <span className="text-3xl !leading-none w-fit">😡</span>
                </div>
            </div>
            <div className="flex justify-end w-full mt-2">
                <Button variant={"outline"}>
                    <span className="material-symbols-outlined me-1 !leading-none !text-xl hover:no-underline">
                        check
                    </span>{" "}
                    Next
                </Button>
            </div>
        </section>
    );
}
