import { table, getMinifiedRecords } from "../../lib/airtable"

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST") {
        const { id, name, neighbourhood, address, imgUrl, voting } = req.body
        try {
            if(!id) return res.json({ message: "Id is missing" })
            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id="${id}"`
            }).firstPage()
            if(findCoffeeStoreRecords.length !== 0){
                const records = getMinifiedRecords(findCoffeeStoreRecords)
                res.json(records)
            } else {
            if(!id || !name) return res.json({ message: "Id or Name is missing" });
            const createRecords = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            neighbourhood,
                            address,
                            imgUrl,
                            voting
                        }
                    }
                ])
            const records = getMinifiedRecords(createRecords)
            res.json(records)
          }
        } catch (err) {
            console.log(err);
            res.status(500)
            res.json({ message: "Something went wrong" })
        }
  }
}

export default createCoffeeStore;