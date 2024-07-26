// flux.test.js
import getState from './flux';

describe('fetchRandomLine action', () => {
    it('should fetch a random line from the Gutenberg library and update the message in the store', async () => {
        const { actions, store } = getState({
            getStore: () => store,
            getActions: () => actions,
            setStore: (newStore) => Object.assign(store, newStore)
        });

        // Call the fetchRandomLine action
        await actions.fetchRandomLine();

        // Check if the store's message has been updated
        expect(store.message).toBeDefined();
        expect(store.message).not.toBe('');

        // Optionally, log the fetched message to see the actual line
        console.log('Fetched random line:', store.message);
    });
});