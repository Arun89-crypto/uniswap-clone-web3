import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'x989m0sl',
    dataset: 'production',
    apiVersion: 'v1',
    token: 'skmeo9WOtPUvBXb5lGjk8AOOwPPba1u3Q7xw4n8Hn0p8KjvqcjlmxgVTqUdyFF8Htg3dFO5gDsj43HKVwqX4L5XHEdMISkKdPC6GgomfM7C2OlFxp1BvzgEuxwfE6kRGzfzFatqIOUgGJHAMyEauVaPTXTDRAjqDpv3oCp1RXXXx9HP3lnVE',
    useCdn: false
})