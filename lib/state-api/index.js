class StateApi {
    constructor(rawData) {
      this.data = {
        articles: this.mapIntoObject(rawData.articles),
        authors: this.mapIntoObject(rawData.authors),
        searchTerm: '',
        timestamp: new Date(),
      };
      this.subscription = {};
      this.lastSubscriptionId = 0;
    }
    mapIntoObject(arr) {
      return arr.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    getState = () => {
      return this.data;
    }
    lookupAuthor = (authorId) => {
      return this.data.authors[authorId];
    }

    subscribe = (cb) => {
      this.lastSubscriptionId++;
      this.subscription[this.lastSubscriptionId] = cb;
      return this.lastSubscriptionId;
    };

    unsubscribe = (subscriptionId) => {
      delete this.subscription[subscriptionId];
    }

    mergeWithState = (stateChange) => {
      this.data = {
        ...this.data,
        ...stateChange,
      };
      this.notifySubscribers();
    }

    setSearchTerm = (searchTerm) => {
      this.mergeWithState({
        searchTerm,
      });
    };

    notifySubscribers = () => {
      Object.values(this.subscription).forEach((cb) => cb());
    }

    startClock = () => {
      setInterval(() =>{
        this.mergeWithState({timestamp: new Date()});
      }, 1000);
    }
  }
  
  export default StateApi;
  