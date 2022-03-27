import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStores from '../../data/coffee-store.json';

export function getStaticProps({ params }) {
    return {
        props: {
            coffeeStores: coffeeStores.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id
            })
        }
    }
}

export  function getStaticPaths() {
    return {
        paths: [
            { params: { id: "0" }},
            { params: { id: "1" }},
            { params: { id: "2" }}
        ],
        fallback: false
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    return(
        <div>
            <p>{props.coffeeStores.address}</p>
            <p>{props.coffeeStores.name}</p>
        </div>
    )
}

export default CoffeeStore;