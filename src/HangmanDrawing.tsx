import React from 'react'
import './styles/HangmanDrawing.css'

const HEAD = <div className="hangman-head" />
const BODY = <div className="hangman-body" />
const RIGHT_ARM = <div className="hangman-right-arm" />
const LEFT_ARM = <div className="hangman-left-arm" />
const RIGHT_LEG = <div className="hangman-right-leg" />
const LEFT_LEG = <div className="hangman-left-leg" />

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]
type HangmanDrawingProps = {
  numberOfGuesses: number
}

const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="hangman-container">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="hang-icon-four" />
      <div className="hang-icon-three" />
      <div className="hang-icon-two" />
      <div className="hang-icon-one" />
    </div>
  )
}

export default HangmanDrawing
