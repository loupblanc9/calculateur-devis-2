
export default async function handler(req, res) {
  const { pickup, dropoff } = req.query;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const departureAddress = "26 Rue du Château d’Eau, 95650 Boissy-l'Aillerie";

  const fetchDistance = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const distanceMeters = data.rows[0].elements[0].distance.value;
    return distanceMeters / 1000; // Convert to km
  };

  try {
    const distance1 = await fetchDistance(departureAddress, pickup);
    const distance2 = await fetchDistance(pickup, dropoff);
    const totalDistance = distance1 + distance2;
    const totalPrice = 50 + Math.ceil(totalDistance);
    res.status(200).json({ price: totalPrice });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors du calcul de la distance.' });
  }
}
