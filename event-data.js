const videoExamples = {
  "running": {
    "name": "Beach & city run",
    "pattern": "One journey, connections across time",
    "selected": 7,
    "cover": 6,
    "category": "activity",
    "events": [
      {
        "id": 1,
        "title": "Pick up a stone on the beach",
        "choice": "Pick up stone",
        "time": "0–12.86 s",
        "image": "assets/images/events/running-1.webp",
        "before": [],
        "text": "The stone picked up here reappears at the hilltop in E7, linking the beginning and end of the journey.",
        "narration": "On the beach, a man picks up a stone.",
        "start": 0,
        "end": 12.86,
        "clip": "assets/videos/events/running-1.mp4",
        "clipStart": 5.5,
        "clipDuration": 6
      },
      {
        "id": 2,
        "title": "Run along the beach",
        "choice": "Run on beach",
        "time": "12.86–31.77 s",
        "image": "assets/images/events/running-2.webp",
        "before": [],
        "text": "The beach run leads into the bridge crossing. Passing the seal is also linked to the later encounter in E8.",
        "narration": "He runs along the beach and passes a seal.",
        "start": 12.86,
        "end": 31.77,
        "clip": "assets/videos/events/running-2.mp4",
        "clipStart": 25,
        "clipDuration": 6
      },
      {
        "id": 3,
        "title": "Run across the bridge",
        "choice": "Cross bridge",
        "time": "32.53–55.98 s",
        "image": "assets/images/events/running-3.webp",
        "before": [
          2
        ],
        "text": "The route continues from the beach across a bridge towards the city, before entering the tunnel.",
        "narration": "The run continues across a bridge towards the city.",
        "start": 32.53,
        "end": 55.98,
        "clip": "assets/videos/events/running-3.mp4",
        "clipStart": 40,
        "clipDuration": 6
      },
      {
        "id": 4,
        "title": "Run through the tunnel",
        "choice": "Enter tunnel",
        "time": "56.74–86.24 s",
        "image": "assets/images/events/running-4.webp",
        "before": [
          3
        ],
        "text": "The tunnel is the next connected part of the route between the bridge and city streets.",
        "narration": "He runs through a long tunnel.",
        "start": 56.74,
        "end": 86.24,
        "clip": "assets/videos/events/running-4.mp4",
        "clipStart": 67,
        "clipDuration": 6
      },
      {
        "id": 5,
        "title": "Run through the city streets",
        "choice": "City streets",
        "time": "86.24–109.69 s",
        "image": "assets/images/events/running-5.webp",
        "before": [
          4
        ],
        "text": "The city section follows the tunnel and leads towards the hill climb.",
        "narration": "He runs through city streets and along the Hollywood Walk of Fame.",
        "start": 86.24,
        "end": 109.69,
        "clip": "assets/videos/events/running-5.mp4",
        "clipStart": 91,
        "clipDuration": 6
      },
      {
        "id": 6,
        "title": "Run up the hill at sunrise",
        "choice": "Climb hill",
        "time": "109.69–130.12 s",
        "image": "assets/images/events/running-6.webp",
        "before": [
          5
        ],
        "text": "Reaching the hilltop supplies the setting for E7. The other input is the stone carried from E1.",
        "narration": "As the sun rises, he runs up a steep hill.",
        "start": 109.69,
        "end": 130.12,
        "clip": "assets/videos/events/running-6.mp4",
        "clipStart": 116,
        "clipDuration": 6
      },
      {
        "id": 7,
        "title": "Leave the stone at the hilltop",
        "choice": "Leave stone",
        "time": "130.12–135.42 s",
        "image": "assets/images/events/running-7.webp",
        "before": [
          1,
          6
        ],
        "text": "This moment connects two distant parts of the video: picking up the stone in E1 and reaching the hilltop in E6.",
        "narration": "At the hilltop, he drops the stone he picked up on the beach.",
        "start": 130.12,
        "end": 135.42,
        "clip": "assets/videos/events/running-7.mp4",
        "clipStart": 131,
        "clipDuration": 4.42
      },
      {
        "id": 8,
        "title": "Return to the seal",
        "choice": "Meet the seal",
        "time": "136.17–151.3 s",
        "image": "assets/images/events/running-8.webp",
        "before": [
          2
        ],
        "text": "The later seal encounter reconnects with the animal passed during the beach run in E2.",
        "narration": "In the closing sequence, he reaches towards the seal seen on the beach.",
        "start": 136.17,
        "end": 151.3,
        "clip": "assets/videos/events/running-8.mp4",
        "clipStart": 144.2,
        "clipDuration": 6
      }
    ],
    "duration": 151.208333
  },
  "carwash": {
    "name": "Car wash",
    "pattern": "A shared task takes a playful turn",
    "selected": 5,
    "cover": 3,
    "category": "activity",
    "events": [
      {
        "id": 1,
        "title": "Wash the car by hand",
        "choice": "Wash the car",
        "time": "0–56.44 s",
        "image": "assets/images/events/carwash-1.webp",
        "before": [],
        "text": "Washing the car begins the main activity chain, followed by rinsing and wiping in E3.",
        "narration": "Two women wash a car by hand.",
        "start": 0,
        "end": 56.44,
        "clip": "assets/videos/events/carwash-1.mp4",
        "clipStart": 7,
        "clipDuration": 6
      },
      {
        "id": 2,
        "title": "Clean a motorcycle nearby",
        "choice": "Clean a bike",
        "time": "16.76–21.16 s",
        "image": "assets/images/events/carwash-2.webp",
        "before": [],
        "text": "The motorcycle cleaning is a separate activity with no annotated links to the car-washing chain.",
        "narration": "Nearby, another person cleans a motorcycle.",
        "start": 16.76,
        "end": 21.16,
        "clip": "assets/videos/events/carwash-2.mp4",
        "clipStart": 16.76,
        "clipDuration": 4.4
      },
      {
        "id": 3,
        "title": "Rinse and wipe the car",
        "choice": "Rinse & wipe",
        "time": "55.56–119.05 s",
        "image": "assets/images/events/carwash-3.webp",
        "before": [
          1
        ],
        "text": "The hand wash is followed by rinsing and wiping. This step leads into both the hose exchange and continued cleaning.",
        "narration": "One woman rinses the car with a hose while the other wipes it.",
        "start": 55.56,
        "end": 119.05,
        "clip": "assets/videos/events/carwash-3.mp4",
        "clipStart": 76,
        "clipDuration": 6
      },
      {
        "id": 4,
        "title": "Spray water and exchange the hose",
        "choice": "Turn the hose",
        "time": "119.93–137.57 s",
        "image": "assets/images/events/carwash-4.webp",
        "before": [
          3
        ],
        "text": "The hose used for rinsing becomes part of a playful exchange before cleaning continues.",
        "narration": "One woman sprays water towards the other, who reaches for the hose.",
        "start": 119.93,
        "end": 137.57,
        "clip": "assets/videos/events/carwash-4.mp4",
        "clipStart": 123,
        "clipDuration": 6
      },
      {
        "id": 5,
        "title": "Continue cleaning the car",
        "choice": "Keep cleaning",
        "time": "138.45–151.68 s",
        "image": "assets/images/events/carwash-5.webp",
        "before": [
          3,
          4
        ],
        "text": "This cleaning step is linked to both the earlier rinse and the hose exchange. It precedes another splash in E6.",
        "narration": "Cleaning continues as the two women work around the car.",
        "start": 138.45,
        "end": 151.68,
        "clip": "assets/videos/events/carwash-5.mp4",
        "clipStart": 142,
        "clipDuration": 6
      },
      {
        "id": 6,
        "title": "Spray water back towards the other woman",
        "choice": "Spray back",
        "time": "151.68–176.37 s",
        "image": "assets/images/events/carwash-6.webp",
        "before": [
          5
        ],
        "text": "After the cleaning step, one woman turns the hose towards the other again.",
        "narration": "The hose is turned towards the other woman again.",
        "start": 151.68,
        "end": 176.37,
        "clip": "assets/videos/events/carwash-6.mp4",
        "clipStart": 154,
        "clipDuration": 6
      },
      {
        "id": 7,
        "title": "Another woman approaches",
        "choice": "Someone joins",
        "time": "140.21–161.38 s",
        "image": "assets/images/events/carwash-7.webp",
        "before": [],
        "text": "This arrival has no annotated links to the main chain. It can be included as context or left out of the edit.",
        "narration": "A woman in white approaches while the car washing continues.",
        "start": 140.21,
        "end": 161.38,
        "clip": "assets/videos/events/carwash-7.mp4",
        "clipStart": 148,
        "clipDuration": 6
      }
    ],
    "duration": 176.285872
  },
  "karate": {
    "name": "Martial arts",
    "pattern": "A movement sequence",
    "selected": 2,
    "events": [
      {
        "id": 1,
        "title": "Take position on the mat",
        "choice": "Take position",
        "time": "6.94–69.08 s",
        "image": "assets/images/events/karate-1.webp",
        "before": [],
        "text": "The group takes position before the demonstration begins.",
        "narration": "Three men take position on the mat.",
        "start": 6.94,
        "end": 69.08,
        "clip": "assets/videos/events/karate-1.mp4",
        "clipStart": 20,
        "clipDuration": 6
      },
      {
        "id": 2,
        "title": "Begin the martial arts routine",
        "choice": "Begin routine",
        "time": "37.28–43.49 s",
        "image": "assets/images/events/karate-2.webp",
        "before": [
          1
        ],
        "text": "The routine begins from the standing position and leads into the floor movement.",
        "narration": "The man in front begins the martial arts routine.",
        "start": 37.28,
        "end": 43.49,
        "clip": "assets/videos/events/karate-2.mp4",
        "clipStart": 37.3,
        "clipDuration": 6
      },
      {
        "id": 3,
        "title": "Continue the routine on the floor",
        "choice": "Move to floor",
        "time": "43.13–55.55 s",
        "image": "assets/images/events/karate-3.webp",
        "before": [
          2
        ],
        "text": "The floor movement continues the routine started in E2.",
        "narration": "He lowers himself to the mat and continues with a turning floor movement.",
        "start": 43.13,
        "end": 55.55,
        "clip": "assets/videos/events/karate-3.mp4",
        "clipStart": 45,
        "clipDuration": 6
      }
    ],
    "category": "activity",
    "duration": 72.980313
  },
  "frisbee": {
    "name": "Dog & frisbee",
    "cover": 1,
    "selected": 3,
    "events": [
      {
        "id": 1,
        "title": "Walk with the dog",
        "time": "0.41–8.14 s",
        "image": "assets/images/events/frisbee-1.webp",
        "before": [],
        "text": "The person and dog in the field set up the throw and the later camera fall.",
        "choice": "Walk with dog",
        "start": 0.41,
        "end": 8.14,
        "clip": "assets/videos/events/frisbee-1.mp4",
        "clipStart": 1.28,
        "clipDuration": 6,
        "narration": "A person walks through the field with a dog."
      },
      {
        "id": 2,
        "title": "Throw the frisbee",
        "time": "6.72–29.51 s",
        "image": "assets/images/events/frisbee-2.webp",
        "before": [
          1
        ],
        "text": "The person throws the frisbee, and the dog chases it.",
        "choice": "Throw frisbee",
        "start": 6.72,
        "end": 29.51,
        "clip": "assets/videos/events/frisbee-2.mp4",
        "clipStart": 8.72,
        "clipDuration": 6,
        "narration": "The person throws a frisbee and the dog chases it."
      },
      {
        "id": 3,
        "title": "The camera falls",
        "time": "29.10–38.87 s",
        "image": "assets/images/events/frisbee-3.webp",
        "before": [
          1,
          2
        ],
        "text": "The camera fall is linked to both the person with the dog and the throw-and-chase event.",
        "choice": "Camera falls",
        "start": 29.1,
        "end": 38.87,
        "clip": "assets/videos/events/frisbee-3.mp4",
        "clipStart": 30.98,
        "clipDuration": 6,
        "narration": "The camera falls during the sequence."
      }
    ],
    "pattern": "A throw and its consequences",
    "category": "activity",
    "duration": 40.588477
  },
  "cat": {
    "name": "Cat care",
    "pattern": "Context and a connected sequence",
    "selected": 3,
    "events": [
      {
        "id": 1,
        "title": "An empty kitchen",
        "choice": "Empty kitchen",
        "time": "0–5.26 s",
        "image": "assets/images/events/cat-1.webp",
        "before": [],
        "text": "This opening shot has no annotated links to the care sequence. It can be omitted without removing a prerequisite.",
        "narration": "The video opens on an empty kitchen.",
        "start": 0,
        "end": 5.26,
        "clip": "assets/videos/events/cat-1.mp4",
        "clipStart": 0,
        "clipDuration": 5.26
      },
      {
        "id": 2,
        "title": "Sit down with the cat",
        "choice": "Hold the cat",
        "time": "5.26–57.81 s",
        "image": "assets/images/events/cat-2.webp",
        "before": [],
        "text": "Holding the cat sets up the nail-trimming step in E3.",
        "narration": "A man sits down with the cat in his lap.",
        "start": 5.26,
        "end": 57.81,
        "clip": "assets/videos/events/cat-2.mp4",
        "clipStart": 38,
        "clipDuration": 6
      },
      {
        "id": 3,
        "title": "Trim the cat’s nails",
        "choice": "Trim nails",
        "time": "57.81–143.64 s",
        "image": "assets/images/events/cat-3.webp",
        "before": [
          2
        ],
        "text": "Nail trimming follows holding the cat and produces the clippings discarded in E4.",
        "narration": "With the cat in his lap, he trims its nails.",
        "start": 57.81,
        "end": 143.64,
        "clip": "assets/videos/events/cat-3.mp4",
        "clipStart": 65,
        "clipDuration": 6
      },
      {
        "id": 4,
        "title": "Discard the clippings and leave",
        "choice": "Tidy up",
        "time": "143.64–175.17 s",
        "image": "assets/images/events/cat-4.webp",
        "before": [
          3
        ],
        "text": "The clippings from E3 are discarded as the care sequence finishes.",
        "narration": "He disposes of the clippings, and the man and cat leave the kitchen.",
        "start": 143.64,
        "end": 175.17,
        "clip": "assets/videos/events/cat-4.mp4",
        "clipStart": 160,
        "clipDuration": 6
      }
    ],
    "category": "activity",
    "duration": 175.124867
  },
  "chicken": {
    "name": "Fried chicken",
    "selected": 6,
    "events": [
      {
        "id": 1,
        "title": "Make the brine",
        "time": "16–26 s",
        "image": "assets/images/events/chicken-1.webp",
        "before": [],
        "text": "The brine is prepared before being poured over the chicken.",
        "choice": "Make brine",
        "start": 16.0,
        "end": 26.0,
        "clip": "assets/videos/events/chicken-1.mp4",
        "clipStart": 20,
        "clipDuration": 6,
        "narration": "Buttermilk, salt and hot sauce are mixed into a brine."
      },
      {
        "id": 2,
        "title": "Brine the chicken",
        "time": "33–36 s",
        "image": "assets/images/events/chicken-2.webp",
        "before": [
          1
        ],
        "text": "Brining uses the mixture prepared in E1.",
        "choice": "Brine chicken",
        "start": 33.0,
        "end": 36.0,
        "clip": "assets/videos/events/chicken-2.mp4",
        "clipStart": 33.0,
        "clipDuration": 3.0,
        "narration": "The chicken is soaked in the prepared brine."
      },
      {
        "id": 3,
        "title": "Rinse the chicken",
        "time": "46–53 s",
        "image": "assets/images/events/chicken-3.webp",
        "before": [
          2
        ],
        "text": "The brined chicken is rinsed before seasoning.",
        "choice": "Rinse chicken",
        "start": 46.0,
        "end": 53.0,
        "clip": "assets/videos/events/chicken-3.mp4",
        "clipStart": 46.5,
        "clipDuration": 6,
        "narration": "The brined chicken is rinsed."
      },
      {
        "id": 4,
        "title": "Season the chicken",
        "time": "60–89 s",
        "image": "assets/images/events/chicken-4.webp",
        "before": [
          3
        ],
        "text": "Seasoning the chicken prepares one of the two inputs needed for coating.",
        "choice": "Season chicken",
        "start": 60.0,
        "end": 89.0,
        "clip": "assets/videos/events/chicken-4.mp4",
        "clipStart": 69,
        "clipDuration": 6,
        "narration": "The chicken is seasoned, ready for coating."
      },
      {
        "id": 5,
        "title": "Season the flour",
        "time": "93–103 s",
        "image": "assets/images/events/chicken-5.webp",
        "before": [],
        "text": "The flour is prepared separately, ready for coating the chicken.",
        "choice": "Season flour",
        "start": 93.0,
        "end": 103.0,
        "clip": "assets/videos/events/chicken-5.mp4",
        "clipStart": 95.0,
        "clipDuration": 6,
        "narration": "In a separate preparation, the flour is seasoned."
      },
      {
        "id": 6,
        "title": "Coat the chicken",
        "time": "108–129 s",
        "image": "assets/images/events/chicken-6.webp",
        "before": [
          4,
          5
        ],
        "text": "Coating depends on two preparations: seasoned chicken and seasoned flour.",
        "choice": "Coat chicken",
        "start": 108.0,
        "end": 129.0,
        "clip": "assets/videos/events/chicken-6.mp4",
        "clipStart": 116,
        "clipDuration": 6,
        "narration": "The seasoned chicken and flour come together as the chicken is coated."
      },
      {
        "id": 7,
        "title": "Fry until golden",
        "time": "158–168 s",
        "image": "assets/images/events/chicken-7.webp",
        "before": [
          6
        ],
        "text": "The coated chicken is placed in hot oil and fried until golden brown.",
        "choice": "Fry chicken",
        "start": 158.0,
        "end": 168.0,
        "clip": "assets/videos/events/chicken-7.mp4",
        "clipStart": 160.0,
        "clipDuration": 6,
        "narration": "The coated chicken is fried until golden."
      },
      {
        "id": 8,
        "title": "Fry the remaining batches",
        "time": "173–180 s",
        "image": "assets/images/events/chicken-8.webp",
        "before": [
          7
        ],
        "text": "Frying continues, with dark and white meat cooked in separate batches.",
        "choice": "Finish batches",
        "start": 173.0,
        "end": 180.0,
        "clip": "assets/videos/events/chicken-8.mp4",
        "clipStart": 173.5,
        "clipDuration": 6,
        "narration": "The remaining chicken is fried in separate batches."
      }
    ],
    "pattern": "Two preparations, one coating",
    "category": "cooking",
    "duration": 189.321
  },
  "cooking": {
    "name": "Sauce & mash",
    "selected": 6,
    "events": [
      {
        "id": 1,
        "title": "Cook butter and onions",
        "time": "75–153 s",
        "image": "assets/images/events/cooking-1.webp",
        "before": [],
        "text": "Butter and onions begin the sauce preparation.",
        "choice": "Butter & onions",
        "start": 75.0,
        "end": 153.0,
        "clip": "assets/videos/events/cooking-1.mp4",
        "clipStart": 77.0,
        "clipDuration": 6,
        "narration": "Butter and onions cook together to start the sauce."
      },
      {
        "id": 2,
        "title": "Season and add flour",
        "time": "172–185 s",
        "image": "assets/images/events/cooking-2.webp",
        "before": [
          1
        ],
        "text": "Seasoning and flour are added to the onions from E1.",
        "choice": "Season & flour",
        "start": 172.0,
        "end": 185.0,
        "clip": "assets/videos/events/cooking-2.mp4",
        "clipStart": 174.0,
        "clipDuration": 6,
        "narration": "Seasoning and flour are added to the onions."
      },
      {
        "id": 3,
        "title": "Finish the sauce",
        "time": "225–285 s",
        "image": "assets/images/events/cooking-3.webp",
        "before": [
          2
        ],
        "text": "Adding milk completes the sauce, ready for plating.",
        "choice": "Finish sauce",
        "start": 225.0,
        "end": 285.0,
        "clip": "assets/videos/events/cooking-3.mp4",
        "clipStart": 227.0,
        "clipDuration": 6,
        "narration": "Milk is stirred in to finish the onion sauce."
      },
      {
        "id": 4,
        "title": "Mash the potatoes",
        "time": "391–437 s",
        "image": "assets/images/events/cooking-4.webp",
        "before": [],
        "text": "Mashing starts a separate potato preparation chain.",
        "choice": "Mash potatoes",
        "start": 391.0,
        "end": 437.0,
        "clip": "assets/videos/events/cooking-4.mp4",
        "clipStart": 393.0,
        "clipDuration": 6,
        "narration": "In a separate preparation, the potatoes are mashed."
      },
      {
        "id": 5,
        "title": "Add butter and milk",
        "time": "454–504 s",
        "image": "assets/images/events/cooking-5.webp",
        "before": [
          4
        ],
        "text": "Butter and milk finish the mashed potatoes, ready to serve.",
        "choice": "Butter & milk",
        "start": 454.0,
        "end": 504.0,
        "clip": "assets/videos/events/cooking-5.mp4",
        "clipStart": 456.0,
        "clipDuration": 6,
        "narration": "Butter and milk are mixed into the mashed potatoes."
      },
      {
        "id": 6,
        "title": "Plate and serve",
        "time": "509–540 s",
        "image": "assets/images/events/cooking-6.webp",
        "before": [
          3,
          5
        ],
        "text": "Plating brings together two preparations: the onion sauce and the mashed potatoes.",
        "choice": "Plate & serve",
        "start": 509.0,
        "end": 540.0,
        "clip": "assets/videos/events/cooking-6.mp4",
        "clipStart": 533,
        "clipDuration": 6,
        "narration": "The sauce and mashed potatoes are brought together on the plate."
      }
    ],
    "pattern": "Separate chains meet at the plate",
    "category": "cooking",
    "duration": 547.899
  },
  "salad": {
    "name": "Salad & dressing",
    "pattern": "Two preparations come together",
    "selected": 5,
    "events": [
      {
        "id": 1,
        "title": "Combine the vegetables",
        "choice": "Add veg",
        "time": "16–20 s",
        "image": "assets/images/events/salad-1.webp",
        "before": [],
        "text": "The tomato, cucumber and onion form the salad base before the bread is added.",
        "narration": "Tomato, cucumber and sliced onion are combined in a bowl.",
        "start": 16,
        "end": 20,
        "clip": "assets/videos/events/salad-1.mp4",
        "clipStart": 16,
        "clipDuration": 4
      },
      {
        "id": 2,
        "title": "Add toasted pita bread",
        "choice": "Add pita",
        "time": "20–23 s",
        "image": "assets/images/events/salad-2.webp",
        "before": [
          1
        ],
        "text": "The toasted bread is added to the prepared vegetables before tossing.",
        "narration": "Chopped toasted pita bread is added to the vegetables.",
        "start": 20,
        "end": 23,
        "clip": "assets/videos/events/salad-2.mp4",
        "clipStart": 20,
        "clipDuration": 3
      },
      {
        "id": 3,
        "title": "Toss the salad",
        "choice": "Toss salad",
        "time": "23–28 s",
        "image": "assets/images/events/salad-3.webp",
        "before": [
          2
        ],
        "text": "Tossing finishes the salad preparation, which is then combined with the separate dressing.",
        "narration": "The vegetables and bread are tossed together.",
        "start": 23,
        "end": 28,
        "clip": "assets/videos/events/salad-3.mp4",
        "clipStart": 23,
        "clipDuration": 5
      },
      {
        "id": 4,
        "title": "Mix the dressing",
        "choice": "Mix dressing",
        "time": "28–50 s",
        "image": "assets/images/events/salad-4.webp",
        "before": [],
        "text": "The dressing is prepared separately. Both this mixture and the tossed salad lead into E5.",
        "narration": "Pomegranate molasses, lemon juice, olive oil, salt and pepper are mixed into a dressing.",
        "start": 28,
        "end": 50,
        "clip": "assets/videos/events/salad-4.mp4",
        "clipStart": 37,
        "clipDuration": 6
      },
      {
        "id": 5,
        "title": "Combine salad and dressing",
        "choice": "Dress salad",
        "time": "51–69 s",
        "image": "assets/images/events/salad-5.webp",
        "before": [
          3,
          4
        ],
        "text": "The final toss brings together two inputs: the salad from E3 and the dressing from E4.",
        "narration": "The dressing is poured over the prepared salad and everything is tossed together.",
        "start": 51,
        "end": 69,
        "clip": "assets/videos/events/salad-5.mp4",
        "clipStart": 53,
        "clipDuration": 6
      }
    ],
    "category": "cooking",
    "duration": 92.625
  },
  "noodles": {
    "name": "Stir-fried noodles",
    "pattern": "Several preparations, one dish",
    "selected": 8,
    "events": [
      {
        "id": 1,
        "title": "Soak the rice noodles",
        "choice": "Soak noodles",
        "time": "31–46 s",
        "image": "assets/images/events/noodles-1.webp",
        "before": [],
        "text": "The noodles are soaked before being tossed in the wok in E7.",
        "narration": "Rice noodles are soaked in water.",
        "start": 31,
        "end": 46,
        "clip": "assets/videos/events/noodles-1.mp4",
        "clipStart": 33,
        "clipDuration": 6
      },
      {
        "id": 2,
        "title": "Beat an egg and prepare the pan",
        "choice": "Beat egg",
        "time": "41–48 s",
        "image": "assets/images/events/noodles-2.webp",
        "before": [],
        "text": "The beaten egg is prepared separately, ready to cook in E5.",
        "narration": "An egg is beaten and oil is added to the pan.",
        "start": 41,
        "end": 48,
        "clip": "assets/videos/events/noodles-2.mp4",
        "clipStart": 42,
        "clipDuration": 6
      },
      {
        "id": 3,
        "title": "Stir-fry onions and peppers",
        "choice": "Cook veg",
        "time": "49–57 s",
        "image": "assets/images/events/noodles-3.webp",
        "before": [],
        "text": "Cooking the vegetables precedes the shrimp in this annotated preparation chain.",
        "narration": "Onions and peppers are stir-fried.",
        "start": 49,
        "end": 57,
        "clip": "assets/videos/events/noodles-3.mp4",
        "clipStart": 50,
        "clipDuration": 6
      },
      {
        "id": 4,
        "title": "Stir-fry the shrimp",
        "choice": "Cook shrimp",
        "time": "59–72 s",
        "image": "assets/images/events/noodles-4.webp",
        "before": [
          3
        ],
        "text": "The shrimp follows the vegetable preparation and is one of the inputs to the final mix.",
        "narration": "The shrimp is stir-fried in oil.",
        "start": 59,
        "end": 72,
        "clip": "assets/videos/events/noodles-4.mp4",
        "clipStart": 63,
        "clipDuration": 6
      },
      {
        "id": 5,
        "title": "Cook the prepared egg",
        "choice": "Cook egg",
        "time": "74–93 s",
        "image": "assets/images/events/noodles-5.webp",
        "before": [
          2
        ],
        "text": "The egg beaten in E2 is cooked and kept ready for the final combination.",
        "narration": "The prepared egg is added to the pan and cooked.",
        "start": 74,
        "end": 93,
        "clip": "assets/videos/events/noodles-5.mp4",
        "clipStart": 80,
        "clipDuration": 6
      },
      {
        "id": 6,
        "title": "Add oil and curry powder",
        "choice": "Season wok",
        "time": "95–101 s",
        "image": "assets/images/events/noodles-6.webp",
        "before": [],
        "text": "The oil and curry powder form another prepared input to the finished dish.",
        "narration": "Oil and curry powder are added to the wok.",
        "start": 95,
        "end": 101,
        "clip": "assets/videos/events/noodles-6.mp4",
        "clipStart": 95,
        "clipDuration": 6
      },
      {
        "id": 7,
        "title": "Add and toss the noodles",
        "choice": "Toss noodles",
        "time": "105–114 s",
        "image": "assets/images/events/noodles-7.webp",
        "before": [
          1
        ],
        "text": "The soaked noodles from E1 are tossed in the wok before the other ingredients are combined.",
        "narration": "The soaked noodles are added to the wok and tossed.",
        "start": 105,
        "end": 114,
        "clip": "assets/videos/events/noodles-7.mp4",
        "clipStart": 107,
        "clipDuration": 6
      },
      {
        "id": 8,
        "title": "Combine the prepared ingredients",
        "choice": "Combine all",
        "time": "115–136 s",
        "image": "assets/images/events/noodles-8.webp",
        "before": [
          4,
          5,
          6,
          7
        ],
        "text": "The final dish brings together the shrimp preparation, cooked egg, seasoning and noodles.",
        "narration": "Vegetables, shrimp, egg and noodles are combined with sauces and bean sprouts.",
        "start": 115,
        "end": 136,
        "clip": "assets/videos/events/noodles-8.mp4",
        "clipStart": 123,
        "clipDuration": 6
      }
    ],
    "category": "cooking",
    "duration": 152.3
  }
};
