import SocialButton from "@/components/customButton/SocialButton";
import { IoLogoGithub, IoLogoLinkedin, IoLogoDiscord, IoLogoStackoverflow } from "react-icons/io5"
import { FaSteam,  FaBattleNet } from "react-icons/fa"
import ModalDialog from "@/components/modal/ModalDialog";

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
        <SocialButton iconName={IoLogoStackoverflow} path="https://stackoverflow.com/users/19114911/shueiyang">
          @ShueiYang
        </SocialButton>
        <div>
          <ModalDialog title="#Yang" />
        </div>
        <div>
          <ModalDialog title="@Yang" />
        </div>      
        <SocialButton iconName={FaBattleNet} path="https://account.battle.net">
          #YangWenXue
        </SocialButton>
      </div>
    </>
  )
}

export default WebPresence;