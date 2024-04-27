export default async function fetchVinyl(status){
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://localhost:7179/vinyl');
            const data = await response.json();
            setVinyl(data);

            var newvinyl = $.grep(data, function (item) {
                return item.status == status;
            });
            setVinyl(newvinyl);
        }
        fetchData();
    }, []);

    return vinyl;
}
