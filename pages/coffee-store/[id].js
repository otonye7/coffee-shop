import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames'; 
import { fetchCoffeeStores } from '../../lib/coffee-store';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';


export async function getStaticProps ({ params }) {
    const coffeeStores = await fetchCoffeeStores()
    const findCoffeeStoreById = coffeeStores.find(coffeeStore => {
        return coffeeStore.id.toString() === params.id
    })
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores()
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: true
    }
}

const CoffeeStore = (initialProps) => {
    const router = useRouter();
    const id = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore)
    const { state: { coffeeStores } } = useContext(StoreContext);

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, voting, imgUrl, neighborhood, address } = coffeeStore
            const response = await fetch('/api/createCoffeeStore', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting,
                    imgUrl,
                    neighborhood: neighborhood || "",
                    address: address || ""
                })
            })
            const dbCoffeeStore = response.json();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(isEmpty(initialProps.coffeeStore)){
            if(coffeeStore.length > 0){
                const coffeeStoreFromContext = coffeeStores.find(coffeeStore => {
                    return coffeeStore.id.toString() === id
                })
                if(findCoffeeStoreById){
                    setCoffeeStore(coffeeStoreFromContext)
                    handleCreateCoffeeStore(coffeeStoreFromContext)
                }
            }
        } else {
            handleCreateCoffeeStore(initialProps.coffeeStore)
        }
    }, [id, initialProps, initialProps.coffeeStore])

    if(router.isFallback === true){
        return <div>LOADING</div>
    }

    const { location: { address, neighborhood }, name, imgUrl } = coffeeStore
    const handleUpvoteButton = () => {
        console.log("Hanlde Upvote")
    }
    return(
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
            <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
            <Link href='/'>
                <a> Back to home</a>
            </Link>
            </div>
            <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
            </div>
            <Image src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt={name}></Image>
            </div>
            <div className={cls("glass", styles.col2)}>
                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/places.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>{address || 'template'}</p>
                </div>

                {neighborhood && <div className={styles.iconWrapper}>
                    <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>{neighborhood}</p>
                </div>}

                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/star.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>1</p>
                </div>

                <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote!</button>

            <p>{neighborhood}</p>
            </div>
            </div>
        </div>
    )
}

export default CoffeeStore;