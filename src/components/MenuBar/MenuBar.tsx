import { BsChatLeftDots } from "react-icons/bs";
import { FaCircleQuestion, FaGears, FaGithub, FaImage } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Modal from "@/components/Modal/Modal";

import MenuEntry from "./MenuEntry";

export default function MenuBar() {
    return (
        <nav className="flex flex-col justify-between my-4 mx-2">
            <div className="flex flex-col gap-4">
                <MenuEntry to="/" icon={<BsChatLeftDots size="1.5rem" />} />
                <MenuEntry to="/images" icon={<FaImage size="1.5rem" />} />
            </div>
            <div className="flex flex-col gap-4">
                <MenuEntry to="/settings" icon={<FaGears size="1.5rem" />} />
                <Modal
                    modalTitle="Chaterra 🌎"
                    triggerContent={<MenuEntry icon={<FaCircleQuestion size="1.5rem" />} />}
                >
                    <p>
                        Chaterra is a web-based frontend for OpenAI&apos;s GPT and DALL-E models. It is designed to be a
                        simple and easy-to-use user interface that allows you to take advantage of the usage-based
                        pricing model of OpenAI&apos;s API.
                    </p>
                    <div className="divider">Quickstart</div>
                    <p>
                        To get started, simply sign up for an account on{" "}
                        <a
                            className="link text-primary"
                            href="https://platform.openai.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            OpenAI&apos;s website
                        </a>{" "}
                        and create an API key. Then enter your API key in the{" "}
                        <Link className="link text-primary" to="/settings">
                            settings page of Chaterra
                        </Link>
                        . You can now start generating text and images.{" "}
                        <span className="font-bold">Remember that you will be billed by OpenAI for your usage.</span>
                    </p>
                    <div className="divider">Inspiration</div>
                    <p>
                        I (
                        <a
                            className="link text-secondary"
                            href="https://kamilmarut.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Kamil 👋
                        </a>
                        ) am an early adopter of generative AI and have been using ChatGPT since it was first released.
                        I am also not very fond of paying monthly subscriptions. That&apos;s why I created Chaterra - to
                        have a similar experience to ChatGPT but with usage-based billing.
                    </p>
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <span className="font-bold text-primary">Chaterra is open source!</span>
                        <a
                            className="btn btn-ghost"
                            href="https://github.com/exler/chaterra"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub size="1.5rem" />
                        </a>
                    </div>
                </Modal>
            </div>
        </nav>
    );
}
