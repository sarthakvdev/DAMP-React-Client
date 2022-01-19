import Error  from '../assets/error.svg';
import { Image, Text } from "@chakra-ui/react";

export default function ErrorPage() {
    return (
        <div>
        <Text>Looks like there might be some error, refresh the page</Text>
        <Image src={Error} />
        </div>
    )
}
