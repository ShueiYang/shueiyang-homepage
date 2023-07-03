import SocialButton from "@/components/customButton/SocialButton";
import { IoLogoGithub, IoLogoLinkedin, IoLogoDiscord } from "react-icons/io5"
import { FaSteam } from "react-icons/fa"

const WebPresence = () => {

  return (
    <>
      <h2 className="section sm:mb-5"> 
        Sur le Web
      </h2>
      <div className="sm:grid grid-cols-2 lg:grid-cols-4">
        <SocialButton iconName={IoLogoGithub} path="https://github.com/ShueiYang">
          @ShueiYang
        </SocialButton>
        <SocialButton iconName={IoLogoLinkedin} path="https://www.linkedin.com/in/shueiyang">
          @Shueiyang
        </SocialButton>
        <SocialButton iconName={FaSteam} path="https://steamcommunity.com/id/shueiyang">
          @Yangxuzhu
        </SocialButton>
        <SocialButton iconName={IoLogoDiscord} path="https://discord.com/users/282279109273583616">
          @Yang
        </SocialButton>
      </div>
   </>
  )
}

export default WebPresence;