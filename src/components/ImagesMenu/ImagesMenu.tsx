import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import SideMenu from "@/components/SideMenu/SideMenu";
import { ImageGenerationAspectRatio, ImageGenerationQuality } from "@/types/chats";

interface ImagesMenuProps {
    imageQuality: ImageGenerationQuality;
    setImageQuality: (imageQuality: ImageGenerationQuality) => void;
    imageAspectRatio: ImageGenerationAspectRatio;
    setImageAspectRatio: (imageAspectRatio: ImageGenerationAspectRatio) => void;
}

export default function ImagesMenu({
    imageQuality,
    setImageQuality,
    imageAspectRatio,
    setImageAspectRatio
}: ImagesMenuProps) {
    return (
        <SideMenu>
            <>
                <div className="divider divider-primary pr-4 lg:pr-0"></div>
                <div className="flex flex-col gap-2">
                    <div>
                        <label>Quality</label>
                        <SegmentedControl
                            value={imageQuality}
                            onValueChange={(value: number | string) => setImageQuality(value as ImageGenerationQuality)}
                            segments={[
                                { label: "Standard", value: ImageGenerationQuality.STANDARD },
                                { label: "HD", value: ImageGenerationQuality.HD }
                            ]}
                        />
                    </div>
                    <div>
                        <label>Aspect Ratio</label>
                        <SegmentedControl
                            value={imageAspectRatio}
                            onValueChange={(value: number | string) =>
                                setImageAspectRatio(value as ImageGenerationAspectRatio)
                            }
                            segments={[
                                { label: "Square", value: ImageGenerationAspectRatio.SQUARE },
                                { label: "Landscape", value: ImageGenerationAspectRatio.LANDSCAPE },
                                { label: "Portrait", value: ImageGenerationAspectRatio.PORTRAIT }
                            ]}
                        />
                    </div>
                </div>
            </>
        </SideMenu>
    );
}
