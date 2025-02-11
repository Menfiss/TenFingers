"use client"
import Link from "next/link"

interface props{
    URL: string
    text: string
}


export default function ServerLink(props: props){

    return (
        <div>
            <Link href={props.URL}>{props.text}</Link>
        </div>
    )
}