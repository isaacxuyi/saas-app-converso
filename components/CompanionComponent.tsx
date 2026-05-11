"use client"

import { configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import { CompanionComponentProps } from '@/types'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { Code, Variable } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'
import soundwaves from '@/constants/soundwaves.json'
import Image from 'next/image'

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const lottieRef = useRef<LottieRefCurrentProps | null>(null)

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play()
      } else {
        lottieRef.current.stop()
      }
    }
  }, [isSpeaking])

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
    const onMessage = (payload: unknown) => {
      console.log('message', payload)
    }
    const onSpeechStart = () => setIsSpeaking(true)
    const onSpeechEnd = () => setIsSpeaking(false)
    const onError = (error: any) => {
      console.error('Vapi Error:', error)
      // Fallback state reset in case the session fails
      setCallStatus(CallStatus.INACTIVE)
    }

    vapi.on('call-start', onCallStart)
    vapi.on('call-end', onCallEnd)
    vapi.on('message', onMessage)
    vapi.on('error', onError)
    vapi.on('speech-start', onSpeechStart)
    vapi.on('speech-end', onSpeechEnd)

    return () => {
      vapi.off('call-start', onCallStart)
      vapi.off('call-end', onCallEnd)
      vapi.off('message', onMessage)
      vapi.off('error', onError)
      vapi.off('speech-start', onSpeechStart)
      vapi.off('speech-end', onSpeechEnd)
    }
  }, [])

  const toggleMicrophone = () => {
    const currentMutedState = vapi.isMuted()
    vapi.setMuted(!currentMutedState)
    setIsMuted(!currentMutedState)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    const assistantOverrides = {
      variableValues: {
        subject, topic, style
      }
    }

    try {
      await vapi.start(configureAssistant(voice, style), assistantOverrides)
    } catch (error) {
      console.error("Failed to start the VAPI session:", error)
      setCallStatus(CallStatus.INACTIVE)
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  return (
    <section className="flex flex-col h-[70vh]">
        <section className='flex gap-8 justify-between items-start w-full max-sm:flex-col'>
          <div className="companion-section">
            <div className='companion-avatar' style={{
              backgroundColor: getSubjectColor(subject)
            }}>
              <div className={`absolute transition-opacity duration-1000 ${callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'}`}>
              <Lottie 
              lottieRef={lottieRef} 
              animationData={soundwaves}
              autoplay={false}
              className='companion-lottie'

              />
            </div>
              <div className="w-24 h-24 rounded-full bg-pink-300 shadow-inner" />
              
            </div>
            <p className="companion-name font-bold text-2xl">{name}</p>
          </div>
          <div className='user-section'>
            <div className='user-avatar'>
             <Image src={userImage} alt={userName} width={130} height={130} className='rounded-full' />
             <p className="text-lg font-semibold">{userName}</p>
            </div>
            <button className='btn-mic' onClick={toggleMicrophone}>
              <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}  alt='mic' width={36} height={36}/>
              {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
            </button>
          <button
            className={`rounded-lg py-3 cursor-pointer transition-colors w-full text-white ${callStatus === CallStatus.ACTIVE ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} ${callStatus === CallStatus.CONNECTING ? 'animate-pulse' : ''}`}
            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Start Session'}
          </button>
          </div>
        </section>

        <section className='transcript'>
          <div className="transcript-message no-scrollbar">
            MESSAGES
          </div>

          <div className='transcript-fade'>

          </div>

        </section>
    </section>
  )
}

export default CompanionComponent