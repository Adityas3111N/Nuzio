import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SAMPLE_STORIES } from '../constants/data'
import type { Story } from '../types'

interface AudioContextType {
  currentStory: Story
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackRate: number
  waveformBars: number[]
  playStory: (story: Story) => void
  togglePlay: () => void
  seek: (seconds: number) => void
  skip: (seconds: number) => void
  setRate: (rate: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStory, setCurrentStory] = useState<Story>(SAMPLE_STORIES[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(41) // matching design preview initial time
  const [playbackRate, setPlaybackRate] = useState<number>(1)
  const duration = currentStory.audioDurationSec || 135

  // Generate realistic responsive waveform bars
  const [waveformBars, setWaveformBars] = useState<number[]>([
    24, 45, 60, 30, 80, 50, 95, 70, 40, 65, 85, 90, 45, 60, 35, 75, 55, 30, 70, 88, 52, 40, 68,
    30, 20,
  ])

  const audioTimerRef = useRef<number | null>(null)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio()
      audio.onended = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }
      audio.ontimeupdate = () => {
        if (audio.currentTime > 0) {
          setCurrentTime(Math.round(audio.currentTime))
        }
      }
      audioElementRef.current = audio
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      if (audioElementRef.current && audioElementRef.current.src && audioElementRef.current.paused) {
        audioElementRef.current.play().catch(() => {})
      }

      audioTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })

        // Animate waveform gently when playing
        setWaveformBars((prev) =>
          prev.map((val) => {
            const delta = (Math.random() - 0.5) * 20
            return Math.min(100, Math.max(15, Math.round(val + delta)))
          }),
        )
      }, 1000 / playbackRate)
    } else {
      if (audioElementRef.current && !audioElementRef.current.paused) {
        audioElementRef.current.pause()
      }
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current)
      }
    }

    return () => {
      if (audioTimerRef.current) {
        clearInterval(audioTimerRef.current)
      }
    }
  }, [isPlaying, duration, playbackRate])

  const playStory = (story: Story) => {
    setCurrentStory(story)
    setCurrentTime(0)
    setIsPlaying(true)

    if (story.audioUrl && audioElementRef.current) {
      audioElementRef.current.src = story.audioUrl
      audioElementRef.current.playbackRate = playbackRate
      audioElementRef.current.play().catch(() => {})
    } else if (story.id && audioElementRef.current) {
      fetch(`/api/audio/story/${story.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.audioUrl && audioElementRef.current) {
            audioElementRef.current.src = data.audioUrl
            audioElementRef.current.playbackRate = playbackRate
            audioElementRef.current.play().catch(() => {})
          }
        })
        .catch(() => {})
    }
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const seek = (seconds: number) => {
    const target = Math.max(0, Math.min(duration, seconds))
    setCurrentTime(target)
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = target
    }
  }

  const skip = (seconds: number) => {
    seek(currentTime + seconds)
  }

  const setRate = (rate: number) => {
    setPlaybackRate(rate)
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = rate
    }
  }

  return (
    <AudioContext.Provider
      value={{
        currentStory,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        waveformBars,
        playStory,
        togglePlay,
        seek,
        skip,
        setRate,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
