// Copy shared by more than one page. Rooms, prices, policies, phone and address are written for this site and
// still need the owner's check before launch.
import { assets } from '@/config/assets'

export const PHONE = '+994 24 205 18 40'
export const ADDRESS = 'Velmira\nNohur lake shore\nGabala AZ3600, Azerbaijan'
export const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Nohur+Lake+Gabala+Azerbaijan'

export const rooms = [
  { id: 'room-2', number: 'Room 2', name: 'The Blue Room', price: 'from 240 AZN', tag: 'Lake side', img: assets.room1,
    text: 'Pale blue walls under the old moulded ceiling, a low wide bed and the long mirror that came with the house. A deep bath behind a linen screen. Sleeps two.' },
  { id: 'room-5', number: 'Room 5', name: 'The Window Room', price: 'from 280 AZN', tag: 'Corner, lake and firs', img: assets.room2,
    text: 'The bed sits right against the tall wire-glass windows, so the first thing you see is the water. Walk-in rain shower, a reading chair, a kettle. Sleeps two.' },
  { id: 'room-8', number: 'Room 8', name: 'The Linen Room', price: 'from 220 AZN', tag: 'Forest side', img: assets.room3,
    text: 'Our quietest room, on the forest side: panelled walls, muslin bedding and two plain lamps for reading. Sleeps two, or three with the day bed.' },
]

export const reservation = {
  text: 'Pick your nights and tell us who is coming. We write back within a day with the rooms that are free; nothing is charged until you arrive.',
  hours: ['Check-in from 3 pm, check-out by noon', 'Two nights at weekends, one on weekdays', 'Groups of up to 18 can take the whole house'],
}

export const stayFaq = [
  { q: 'Is breakfast included?', a: 'Yes. It is served from 8 to 11 in the long room: eggs from the village, local cheese, honey, warm bread and whatever fruit the market has. Dinner is cooked on request, for the whole house at one table.' },
  { q: 'When are the pool and the sauna open?', a: 'The bathhouse pool is warm and open from 7 in the morning to 10 at night. We light the sauna at 4; it is hot by 5 and stays lit until 10. Robes and towels are in your room.' },
  { q: 'How do cancellations work?', a: 'Cancel up to 14 days before you arrive and it costs nothing. After that we keep the price of the first night, unless we can give the room to someone else.' },
  { q: 'How do I pay?', a: 'By card or in cash when you arrive. We never take a deposit by email, and we will never ask for card details in a message.' },
  { q: 'Can we bring children?', a: 'Children over 12 are welcome. The house is built around quiet, so we keep it for older children and adults.' },
  { q: 'Can we bring a dog?', a: 'We are sorry, but not inside: the bathhouse and the linen do not mix with paws. Guide dogs are always welcome.' },
]

export const travelFaq = [
  { q: 'Is there parking?', a: 'Yes, free, by the gate, with room for twelve cars. There is a charging point for electric cars; tell us when you book.' },
  { q: 'Is the road open in winter?', a: 'The road is paved to the gate. After heavy snow we clear it by morning, and you will not need four-wheel drive.' },
  { q: 'Can you collect us from the airport?', a: 'Yes. A car from Gabala airport costs 30 AZN each way. Send us your flight number and we will be at arrivals.' },
  { q: 'What if we arrive late?', a: 'Tell us your time. Someone waits up until midnight, and later arrivals find a key and a lamp left on.' },
  { q: 'Is there wifi?', a: 'In every room and the bathhouse. The phone signal is good in the house and fades out on the dock, which most guests like.' },
]
