import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import SideMenu from "@/components/SideMenu/SideMenu";
import { ImageGenerationAspectRatio, ImageGenerationQuality } from "@/types/chats";

interface ImagesMenuProps {
    className?: string;
    imageQuality: ImageGenerationQuality;
    setImageQuality: (imageQuality: ImageGenerationQuality) => void;
    imageAspectRatio: ImageGenerationAspectRatio;
    setImageAspectRatio: (imageAspectRatio: ImageGenerationAspectRatio) => void;
    numberOfImages: number;
    setNumberOfImages: (numberOfImages: number) => void;
}

export default function ImagesMenu({
    className,
    imageQuality,
    setImageQuality,
    imageAspectRatio,
    setImageAspectRatio,
    numberOfImages,
    setNumberOfImages
}: ImagesMenuProps) {
    return (
        <SideMenu className={className}>
            <>
                <div className="divider divider-primary"></div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col gap-2">
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
                    <div className="flex flex-col gap-2">
                        <label>Number of generated images</label>
                        <SegmentedControl
                            value={numberOfImages}
                            onValueChange={(value: number | string) => setNumberOfImages(Number(value))}
                            segments={[
                                { label: "1", value: 1 },
                                { label: "2", value: 2 },
                                { label: "3", value: 3 },
                                { label: "4", value: 4 }
                            ]}
                        />
                    </div>
                </div>
            </>
        </SideMenu>
    );
}
