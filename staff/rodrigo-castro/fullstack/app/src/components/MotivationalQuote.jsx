import retrieveRandomMotivationalQuote from '../logic/retrieveRandomMotivationalQuote'
import { useEffect, useState } from 'react'
import { useAppContext } from '../hooks'

export default function MotivationalQuote({ className }) {
    const [quote, setQuote] = useState()
    const { freeze, unfreeze } = useAppContext()

    useEffect(() => {
        try {
            freeze()

            retrieveRandomMotivationalQuote((error, quote) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }
                setQuote(quote)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return <div className={className}>
        <q>{`${quote}`}</q>
    </div>
}