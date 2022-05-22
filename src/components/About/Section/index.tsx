import type { FC } from 'react'
import Styles from './AboutSection.module.css'

export const AboutSection: FC = () => {
  return (
    <div className={Styles.aboutCardContainer}>
      <p className={Styles.aboutText}>
        &ldquo;Concert Fast é uma empresa que oferece assistência técnica aos
        seus clientes. Nós podemos ajudar você a resolver problemas técnicos
        relacionados ao seu equipamento eletrônico.&rdquo;
      </p>
      <br />
      <p className={Styles.aboutText}>
        &ldquo;Contamos com uma equipe de profissionais qualificados e com anos
        de experiência em engenharia eletrônica e mecatrônica, dessa forma,
        proporcionando uma ótima qualidade na prestação dos nossos
        serviços.&rdquo;
      </p>
      <br />
      <p className={Styles.aboutText}>
        &ldquo;Nossa missão é oferecer aos nossos clientes uma solução de
        assistência técnica que atenda às suas necessidades. Nós oferecemos
        serviços de assistência técnica para todo o tipo de equipamento
        eletrônico e mecatrônico, desde celulares, notebooks, tablets,
        computadores e até mesmo equipamentos de outros nichos.&rdquo;
      </p>
    </div>
  )
}
