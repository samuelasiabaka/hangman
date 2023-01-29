import { useCallback, useEffect, useState } from 'react'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord '
import { Keyboard } from './Keyboard'
import words from './wordList.json'
import './styles/App.css'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  )

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters((currentLetters) => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])

  return (
    <div className="main-container">
      <div className="main-heading">
        {isWinner && 'Winner! - Refresh / Press Enter to try again'}
        {isLoser && 'Nice Try - Refresh / Press Enter to try again'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div className="keyboard-container">
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter),
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
