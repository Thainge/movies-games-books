import React, { useEffect, useState } from 'react';
import { ContextFunction } from '../../../Contexts/ContextProvider';
import Autosuggest from 'react-autosuggest';
import styles from './form.module.css';
import InputItem from '../Other/inputItem';
import { useParams } from 'react-router-dom';
import localStorage from 'local-storage';

const API_KEY = 'AIzaSyCQADrglEWlZon8QTM4WdocJemxnx7cPvk'

let mockData = [
    {
        "kind": "books#volume",
        "id": "0CTTpPKGvTsC",
        "etag": "mwP8BCReTkI",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/0CTTpPKGvTsC",
        "volumeInfo": {
            "title": "New Spring",
            "subtitle": "The Novel",
            "authors": [
                "Robert Jordan"
            ],
            "publisher": "Macmillan",
            "publishedDate": "2004",
            "description": "War rages around the city of Tar Valon as the prophesy of a child who will change the world sends Moiraine Damodred and Lan Mandragoran on a race against time to find the child before the forces of the Shadow can destroy him.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0765306298"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780765306296"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 352,
            "printType": "BOOK",
            "categories": [
                "Fiction"
            ],
            "averageRating": 4,
            "ratingsCount": 35,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "0.2.4.0.preview.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=0CTTpPKGvTsC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=0CTTpPKGvTsC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=0CTTpPKGvTsC&dq=New+Spring&hl=&cd=1&source=gbs_api",
            "infoLink": "http://books.google.ca/books?id=0CTTpPKGvTsC&dq=New+Spring&hl=&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/New_Spring.html?hl=&id=0CTTpPKGvTsC"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true
            },
            "webReaderLink": "http://play.google.com/books/reader?id=0CTTpPKGvTsC&hl=&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "War rages around the city of Tar Valon as the prophesy of a child who will change the world sends Moiraine Damodred and Lan Mandragoran on a race against time to find the child before the forces of the Shadow can destroy him."
        }
    },
    {
        "kind": "books#volume",
        "id": "RwSagN7EtoUC",
        "etag": "gQtPoVT2D6A",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/RwSagN7EtoUC",
        "volumeInfo": {
            "title": "New Spring",
            "subtitle": "Prequel to the Wheel of Time",
            "authors": [
                "Robert Jordan"
            ],
            "publisher": "Tor Fantasy",
            "publishedDate": "2005-06-13",
            "description": "Soon to be an original series starring Rosamund Pike as Moiraine! Since its debut in 1990, The Wheel of Time® by Robert Jordan has captivated millions of readers around the globe with its scope, originality, and compelling characters. The Wheel of Time turns and Ages come and go, leaving memories that become legend. Legend fades to myth, and even myth is long forgotten when the Age that gave it birth returns again. In the Third Age, an Age of Prophecy, the World and Time themselves hang in the balance. What was, what will be, and what is, may yet fall under the Shadow. For three days battle has raged in the snow around the great city of Tar Valon. In the city, a Foretelling of the future is uttered. On the slopes of Dragonmount, the immense mountain that looms over the city, is born an infant prophesied to change the world. That child must be found before the forces of the Shadow have an opportunity to kill him. Moiraine Damodred, a young Accepted soon to be raised to Aes Sedai, and Lan Mandragoran, a soldier fighting in the battle, are set on paths that will bind their lives together. But those paths are filled with complications and dangers, for Moiraine, of the Royal House of Cairhien, whose king has just died, and Lan, considered the uncrowned king of a nation long dead, find their lives threatened by the plots of those seeking power. New Spring begins Moiraine and Lan's quest to find the Dragon Reborn that will lead to the events of The Eye of the World...and their fateful meeting with Rand al'Thor. New Spring is a perfect jumping-on point for fantasy readers wanting to know more about The Wheel of Time and the forthcoming TV show. The Wheel of Time® New Spring: The Novel #1 The Eye of the World #2 The Great Hunt #3 The Dragon Reborn #4 The Shadow Rising #5 The Fires of Heaven #6 Lord of Chaos #7 A Crown of Swords #8 The Path of Daggers #9 Winter's Heart #10 Crossroads of Twilight #11 Knife of Dreams By Robert Jordan and Brandon Sanderson #12 The Gathering Storm #13 Towers of Midnight #14 A Memory of Light By Robert Jordan Warrior of the Altaii By Robert Jordan and Teresa Patterson The World of Robert Jordan's The Wheel of Time By Robert Jordan, Harriet McDougal, Alan Romanczuk, and Maria Simons The Wheel of Time Companion By Robert Jordan and Amy Romanczuk Patterns of the Wheel: Coloring Art Based on Robert Jordan's The Wheel of Time At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781429961530"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1429961538"
                }
            ],
            "readingModes": {
                "text": true,
                "image": false
            },
            "pageCount": 336,
            "printType": "BOOK",
            "categories": [
                "Fiction"
            ],
            "averageRating": 4.5,
            "ratingsCount": 7,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "0.18.16.0.preview.2",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=RwSagN7EtoUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=RwSagN7EtoUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=RwSagN7EtoUC&pg=PA269&dq=New+Spring&hl=&cd=2&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=RwSagN7EtoUC&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=RwSagN7EtoUC"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "FOR_SALE",
            "isEbook": true,
            "listPrice": {
                "amount": 10.99,
                "currencyCode": "CAD"
            },
            "retailPrice": {
                "amount": 10.99,
                "currencyCode": "CAD"
            },
            "buyLink": "https://play.google.com/store/books/details?id=RwSagN7EtoUC&rdid=book-RwSagN7EtoUC&rdot=1&source=gbs_api",
            "offers": [
                {
                    "finskyOfferType": 1,
                    "listPrice": {
                        "amountInMicros": 10990000,
                        "currencyCode": "CAD"
                    },
                    "retailPrice": {
                        "amountInMicros": 10990000,
                        "currencyCode": "CAD"
                    },
                    "giftable": true
                }
            ]
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=RwSagN7EtoUC&hl=&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "They did not seem eager to face a <b>new spring</b> night without that. Bukama and Lan barely said a word over a dinner of flatbread and dried meat that she tried not to wolf down. Ryne talked and was quite charming, really, with a dimple in&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "rBwzEAAAQBAJ",
        "etag": "Ua033n+cwVs",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/rBwzEAAAQBAJ",
        "volumeInfo": {
            "title": "Sunshine - Tales of new spring",
            "publisher": "Rosewood Publication",
            "description": "A collection of letters written in spring, stories and poems of love, Sunshine – Tales of New Spring is dedicated to everyone out there. Hope, change and a handful of sunshine mixed with fragrance of love, the anthology carries a piece of different people from different part of the world.",
            "readingModes": {
                "text": false,
                "image": true
            },
            "printType": "BOOK",
            "categories": [
                "Antiques & Collectibles"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=rBwzEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=rBwzEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=rBwzEAAAQBAJ&pg=PA4&dq=New+Spring&hl=&cd=3&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=rBwzEAAAQBAJ&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=rBwzEAAAQBAJ"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "FOR_SALE",
            "isEbook": true,
            "listPrice": {
                "amount": 0,
                "currencyCode": "CAD"
            },
            "retailPrice": {
                "amount": 0,
                "currencyCode": "CAD"
            },
            "buyLink": "https://play.google.com/store/books/details?id=rBwzEAAAQBAJ&rdid=book-rBwzEAAAQBAJ&rdot=1&source=gbs_api"
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "ALL_PAGES",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.ca/books/download/Sunshine_Tales_of_new_spring-sample-pdf.acsm?id=rBwzEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=rBwzEAAAQBAJ&hl=&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "A collection of letters written in spring, stories and poems of love, Sunshine – Tales of <b>New Spring</b> is dedicated to everyone out there. Hope, change and a handful of sunshine mixed with fragrance of love, the anthology carries a piece&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "Q2ITAgAAQBAJ",
        "etag": "ljMF7Mzy24o",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/Q2ITAgAAQBAJ",
        "volumeInfo": {
            "title": "New Spring: the Graphic Novel",
            "authors": [
                "Robert Jordan",
                "Chuck Dixon"
            ],
            "publisher": "Macmillan",
            "publishedDate": "2013-06-25",
            "description": "In the last few years before his death, Robert Jordan worked closely with Chuck Dixon and Mike Miller on the graphic adaptation of New Spring. The eight full-color issues of New Spring, released between 2005 and 2010, tell the story of the search for the infant Dragon Reborn and of the adventures of Moiraine Damodred, a young Aes Sedai, and Lan Mandragoran, the uncrowned king of a long-dead nation. Adapted by noted comics writer Chuck Dixon with the full cooperation of Robert Jordan, and illustrated by artists Mike Miller and Harvey Tolibao, New Spring will delight any of Robert Jordan's millions of readers. Tor is proud to collect all eight issues of New Spring in a single volume, which will also include developmental art, script pages, and correspondence between Jordan and Dixon. At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781466840492"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1466840498"
                }
            ],
            "readingModes": {
                "text": true,
                "image": true
            },
            "pageCount": 256,
            "printType": "BOOK",
            "categories": [
                "Comics & Graphic Novels"
            ],
            "averageRating": 3,
            "ratingsCount": 4,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.1.2.0.preview.3",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=Q2ITAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=Q2ITAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=Q2ITAgAAQBAJ&pg=PT210&dq=New+Spring&hl=&cd=4&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=Q2ITAgAAQBAJ&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=Q2ITAgAAQBAJ"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "FOR_SALE",
            "isEbook": true,
            "listPrice": {
                "amount": 12.99,
                "currencyCode": "CAD"
            },
            "retailPrice": {
                "amount": 12.99,
                "currencyCode": "CAD"
            },
            "buyLink": "https://play.google.com/store/books/details?id=Q2ITAgAAQBAJ&rdid=book-Q2ITAgAAQBAJ&rdot=1&source=gbs_api",
            "offers": [
                {
                    "finskyOfferType": 1,
                    "listPrice": {
                        "amountInMicros": 12990000,
                        "currencyCode": "CAD"
                    },
                    "retailPrice": {
                        "amountInMicros": 12990000,
                        "currencyCode": "CAD"
                    },
                    "giftable": true
                }
            ]
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true
            },
            "pdf": {
                "isAvailable": true
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Q2ITAgAAQBAJ&hl=&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "From: Robert Iordan To: Les Dabe] Sent: Wednesday, March 24, 2004 2:55 PM Subject: Re: Fw: <b>New Spring</b> Script Dear Les, I decided to look beyond the first few pages and found that this is indeed a new script. I&#39;m send— ing you a copy of&nbsp;..."
        }
    },
    {
        "kind": "books#volume",
        "id": "yngEsxEO4QYC",
        "etag": "psoijm6Zk0Q",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/yngEsxEO4QYC",
        "volumeInfo": {
            "title": "The Great Hunt",
            "subtitle": "Book Two of 'The Wheel of Time'",
            "authors": [
                "Robert Jordan"
            ],
            "publisher": "Tor Books",
            "publishedDate": "2009-11-17",
            "description": "The Wheel of Time is now an original series on Prime Video, starring Rosamund Pike as Moiraine! In The Great Hunt, the second novel in Robert Jordan’s #1 New York Times bestselling epic fantasy series, The Wheel of Time®, Rand al’Thor and his companions set out to retrieve a powerful magical artifact from The Dark One’s Shadowspawn. For centuries, gleemen have told the tales of The Great Hunt of the Horn. So many tales about each of the Hunters, and so many Hunters to tell of... Now the Horn itself is found: the Horn of Valere long thought only legend, the Horn which will raise the dead heroes of the ages. And it is stolen. In pursuit of the thieves, Rand al’Thor is determined to keep the Horn out of the grasp of The Dark One. But he has also learned that he is The Dragon Reborn—the Champion of Light destined to stand against the Shadow time and again. It is a duty and a destiny that requires Rand to uncover and master magical capabilities he never imagined he possessed. Since its debut in 1990, The Wheel of Time® has captivated millions of readers around the globe with its scope, originality, and compelling characters. The last six books in series were all instant #1 New York Times bestsellers, and The Eye of the World was named one of America's best-loved novels by PBS's The Great American Read. The Wheel of Time® New Spring: The Novel #1 The Eye of the World #2 The Great Hunt #3 The Dragon Reborn #4 The Shadow Rising #5 The Fires of Heaven #6 Lord of Chaos #7 A Crown of Swords #8 The Path of Daggers #9 Winter's Heart #10 Crossroads of Twilight #11 Knife of Dreams By Robert Jordan and Brandon Sanderson #12 The Gathering Storm #13 Towers of Midnight #14 A Memory of Light By Robert Jordan and Teresa Patterson The World of Robert Jordan's The Wheel of Time By Robert Jordan, Harriet McDougal, Alan Romanczuk, and Maria Simons The Wheel of Time Companion By Robert Jordan and Amy Romanczuk Patterns of the Wheel: Coloring Art Based on Robert Jordan's The Wheel of Time At the Publisher's request, this title is being sold without Digital Rights Management Software (DRM) applied.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_13",
                    "identifier": "9781429960137"
                },
                {
                    "type": "ISBN_10",
                    "identifier": "1429960132"
                }
            ],
            "readingModes": {
                "text": true,
                "image": false
            },
            "pageCount": 624,
            "printType": "BOOK",
            "categories": [
                "Fiction"
            ],
            "averageRating": 4.5,
            "ratingsCount": 2,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "0.21.23.0.preview.2",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=yngEsxEO4QYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=yngEsxEO4QYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=yngEsxEO4QYC&printsec=frontcover&dq=New+Spring&hl=&cd=5&source=gbs_api",
            "infoLink": "https://play.google.com/store/books/details?id=yngEsxEO4QYC&source=gbs_api",
            "canonicalVolumeLink": "https://play.google.com/store/books/details?id=yngEsxEO4QYC"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "FOR_SALE",
            "isEbook": true,
            "listPrice": {
                "amount": 10.99,
                "currencyCode": "CAD"
            },
            "retailPrice": {
                "amount": 10.99,
                "currencyCode": "CAD"
            },
            "buyLink": "https://play.google.com/store/books/details?id=yngEsxEO4QYC&rdid=book-yngEsxEO4QYC&rdot=1&source=gbs_api",
            "offers": [
                {
                    "finskyOfferType": 1,
                    "listPrice": {
                        "amountInMicros": 10990000,
                        "currencyCode": "CAD"
                    },
                    "retailPrice": {
                        "amountInMicros": 10990000,
                        "currencyCode": "CAD"
                    },
                    "giftable": true
                }
            ]
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": true
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=yngEsxEO4QYC&hl=&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "The Wheel of Time® New Spring: The Novel #1 The Eye of the World #2 The Great Hunt #3 The Dragon Reborn #4 The Shadow Rising #5 The Fires of Heaven #6 Lord of Chaos #7 A Crown of Swords #8 The Path of Daggers #9 Winter&#39;s Heart #10 ..."
        }
    },
    {
        "kind": "books#volume",
        "id": "HeR1l0V0r54C",
        "etag": "bVVlafGtGEU",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/HeR1l0V0r54C",
        "volumeInfo": {
            "title": "Silent Spring",
            "authors": [
                "Rachel Carson"
            ],
            "publisher": "Houghton Mifflin Harcourt",
            "publishedDate": "2002",
            "description": "Discusses the reckless annihilation of fish and birds by the use of pesticides and warns of the possible genetic effects on humans.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0618249060"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780618249060"
                }
            ],
            "readingModes": {
                "text": false,
                "image": true
            },
            "pageCount": 404,
            "printType": "BOOK",
            "categories": [
                "Nature"
            ],
            "averageRating": 4,
            "ratingsCount": 29,
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": true,
            "contentVersion": "1.2.5.0.preview.1",
            "panelizationSummary": {
                "containsEpubBubbles": false,
                "containsImageBubbles": false
            },
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=HeR1l0V0r54C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=HeR1l0V0r54C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=HeR1l0V0r54C&printsec=frontcover&dq=New+Spring&hl=&cd=6&source=gbs_api",
            "infoLink": "http://books.google.ca/books?id=HeR1l0V0r54C&dq=New+Spring&hl=&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Silent_Spring.html?hl=&id=HeR1l0V0r54C"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "PARTIAL",
            "embeddable": true,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": true,
                "acsTokenLink": "http://books.google.ca/books/download/Silent_Spring-sample-pdf.acsm?id=HeR1l0V0r54C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            },
            "webReaderLink": "http://play.google.com/books/reader?id=HeR1l0V0r54C&hl=&source=gbs_api",
            "accessViewStatus": "SAMPLE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Discusses the reckless annihilation of fish and birds by the use of pesticides and warns of the possible genetic effects on humans."
        }
    },
    {
        "kind": "books#volume",
        "id": "Hw3eQwAACAAJ",
        "etag": "N9qUWUwIKuY",
        "selfLink": "https://www.googleapis.com/books/v1/volumes/Hw3eQwAACAAJ",
        "volumeInfo": {
            "title": "Promise of a New Spring",
            "subtitle": "The Holocaust and Renewal",
            "authors": [
                "Gerda Weissmann Klein"
            ],
            "publishedDate": "1981",
            "description": "Describes the events of the Jewish Holocaust, comparing it to a forest fire that destroys all forms on life. The survivors are the promise of renewal.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "094064651X"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780940646513"
                }
            ],
            "readingModes": {
                "text": false,
                "image": false
            },
            "pageCount": 48,
            "printType": "BOOK",
            "categories": [
                "Holocaust, Jewish (1939-1945)"
            ],
            "maturityRating": "NOT_MATURE",
            "allowAnonLogging": false,
            "contentVersion": "preview-1.0.0",
            "imageLinks": {
                "smallThumbnail": "http://books.google.com/books/content?id=Hw3eQwAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "thumbnail": "http://books.google.com/books/content?id=Hw3eQwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            },
            "language": "en",
            "previewLink": "http://books.google.ca/books?id=Hw3eQwAACAAJ&dq=New+Spring&hl=&cd=7&source=gbs_api",
            "infoLink": "http://books.google.ca/books?id=Hw3eQwAACAAJ&dq=New+Spring&hl=&source=gbs_api",
            "canonicalVolumeLink": "https://books.google.com/books/about/Promise_of_a_New_Spring.html?hl=&id=Hw3eQwAACAAJ"
        },
        "saleInfo": {
            "country": "CA",
            "saleability": "NOT_FOR_SALE",
            "isEbook": false
        },
        "accessInfo": {
            "country": "CA",
            "viewability": "NO_PAGES",
            "embeddable": false,
            "publicDomain": false,
            "textToSpeechPermission": "ALLOWED",
            "epub": {
                "isAvailable": false
            },
            "pdf": {
                "isAvailable": false
            },
            "webReaderLink": "http://play.google.com/books/reader?id=Hw3eQwAACAAJ&hl=&source=gbs_api",
            "accessViewStatus": "NONE",
            "quoteSharingAllowed": false
        },
        "searchInfo": {
            "textSnippet": "Describes the events of the Jewish Holocaust, comparing it to a forest fire that destroys all forms on life. The survivors are the promise of renewal."
        }
    },
]

function AddModalBooks({ setAddModalState, adding }) {
    const obj = ContextFunction();
    const { allBooks, setAllBooks } = obj;

    let { id } = useParams();

    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    // search value is used to filter suggestions
    // Suggestions are the currently filtered search results

    // search results are used to query google and returns books

    function closeModal() {
        setAddModalState(false);
    }

    const PopulateBooksChange = async () => {
        try {
            setSearchResults(() => []);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${API_KEY}&maxResults=40`);
            const json = await response.json();
            setSearchResults(() => json.items);
            setSuggestions(() => json.items);
        } catch (err) {
            console.log(err)
        }
    }

    const SubmitEverything = async (e) => {
        e.preventDefault();

        setLoading(() => true);
        try {
            setAllBooks((prevGames) => {
                let newGames = [...prevGames];

                let newFinishedItems = [];
                results.forEach((item, index) => {
                    try {
                        let author = '';
                        if (item.volumeInfo.authors) {
                            author = item.volumeInfo.authors[0]
                        }
                        let newItem = {
                            id: item.id,
                            author: author,
                            title: item.volumeInfo.title,
                            poster: item.volumeInfo.imageLinks.thumbnail,
                            publishedDate: item.volumeInfo.publishedDate,
                            overview: item.volumeInfo.subtitle,
                            link: item.volumeInfo.infoLink,
                        }

                        newFinishedItems.push(newItem);
                    } catch (err) {
                        console.log(err)
                    }
                });

                if (adding) {
                    newGames.forEach((item, index) => {
                        let id1 = id.toString();
                        let id2 = item.id.toString();
                        if (id1 === id2) {
                            try {
                                newFinishedItems.forEach((data, index) => {
                                    const exists = item.FinishedData.find(a => a.id === data.id)
                                    if (exists) {
                                        newFinishedItems.splice(index, 1);
                                    }
                                });
                            } catch (err) {
                                console.log(err)
                            }

                            let newItemArr = {
                                ...item,
                                FinishedData: [...item.FinishedData, ...newFinishedItems]
                            }
                            newGames[index] = newItemArr;
                        }
                    });
                } else {
                    let newID = (allBooks.length + 1);
                    let newItemArr = {
                        id: newID,
                        folderName: text,
                        FinishedData: [...newFinishedItems]
                    }
                    newGames.push(newItemArr)
                }

                localStorage.set('books', newGames);
                return newGames
            });
        } catch (err) {
            console.log(err)
        }

        setLoading(() => false);
        setText('');
        setResults([]);
        closeModal();
    }

    // On selected item
    const onSuggestionSelected = (event, { suggestion }) => {
        // Add to finished list
        setResults((prev) => {
            let newResults = [...prev];
            let isDuplicate = false;

            newResults.forEach((item, index) => {
                if (item.id === suggestion.id) {
                    isDuplicate = true;
                }
            })
            if (!isDuplicate) {
                newResults.push(suggestion);
            }
            return newResults;
        })
        setSearchValue('');
    }

    // Delete item on click
    const deleteInputItem = (index) => {
        setResults((prev) => {
            let newResults = [...prev];
            newResults.splice(index, 1);
            return newResults;
        })
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.volumeInfo.title;

    const renderSuggestion = (suggestion) => {
        let render = false;
        let title = '';
        let image = '';
        let author = '';

        try {
            if (suggestion.volumeInfo.imageLinks.smallThumbnail) {
                title = suggestion.volumeInfo.title;
                render = true;
            }
            if (suggestion.volumeInfo.imageLinks.smallThumbnail) {
                image = suggestion.volumeInfo.imageLinks.smallThumbnail;
                render = true;
            }
            if (suggestion.volumeInfo.imageLinks.smallThumbnail) {
                author = suggestion.volumeInfo.authors[0];
                render = true;
            }
        } catch (err) {
            console.log(err)
        }

        return <>
            {
                render ? <div className={styles.formDropDown}>
                    <img className={styles.formImage} src={image} />
                    <div className={styles.formTitle}>{title}</div>
                    <div className={styles.formAuthor}>{author}</div>
                </div> : <></>
            }
        </>
    }

    const onChange = (e, { newValue }) => {
        setSearchValue(newValue);
    };

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : searchResults.filter(lang =>
            lang.volumeInfo.title.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            PopulateBooksChange();
        }
    }

    const inputProps = {
        placeholder: 'Search for a book/author',
        value: searchValue,
        onChange: onChange,
        onKeyDown: keyHandler,
    };

    return (
        <form onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} onSubmit={SubmitEverything} className={styles.flexCenterGame}>
            <div className={styles.formContainer}>
                <div className={styles.inputFormContainer}>
                    {
                        adding ? <></> : <div className={styles.textContainer}>
                            <label htmlFor="text" className={styles.nameText}>
                                Name:
                            </label>
                            <input type="text" required onChange={(e) => setText(e.target.value)} placeholder={'Name'} className={styles.nameInput} />
                        </div>
                    }
                    <label htmlFor="text" className={styles.nameText}>
                        Books:
                    </label>
                    <Autosuggest
                        theme={styles}
                        onSuggestionSelected={onSuggestionSelected}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                    <div className={styles.resultSelected}>{results.length === 1 ? `${results.length} book selected` : `${results.length} books selected`}</div>
                    <div className={styles.results}>
                        {
                            results.map((item, index) => (
                                <InputItem key={index} item={item} index={index} deleteInputItem={deleteInputItem} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.delete} onClick={closeModal}>Cancel</div>
                <input type={'submit'} className={`${loading ? styles.disabledEdit : styles.edit}`} value='Submit' />
                {
                    loading ? <div className={styles.loadingBox}>
                        <img src={require('../../../assets/loading.gif')} className={styles.imageLoading}></img>
                    </div> : <></>
                }
            </div>
        </form>
    );
}

export default AddModalBooks;