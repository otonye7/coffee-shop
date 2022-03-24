import { useRouter } from 'next/router';

const CoffeeStore = () => {
    const router = useRouter();
    console.log(router);
    return(
        <div>COFFEE ROUTE PAGE</div>
    )
}

export default CoffeeStore;