# Advanced React Native App Performance

A collection of React Native optimization patterns, performance-focused components, and best practices for building high-performance mobile apps.

## Features

* Efficient list rendering: ScrollView, FlatList, FlashList
* Virtualization & cell recycling
* Memoization: React.memo, useMemo, useCallback
* Optimized image loading & caching
* Smooth animations and transitions
* Memory and CPU performance tuning
* Architecture-level optimizations: Turbo Modules, JSI, Fabric, Codegen

## Recommended Dataset Ranges

| Component  | Recommended Data Range | Notes                                                                                  |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------- |
| ScrollView | 1 – 20 items           | Small, static content; forms or settings screens                                       |
| FlatList   | 20 – 500 items         | Medium-sized dynamic lists; uses virtualization                                        |
| FlashList  | 500+ items             | Large datasets; recycles cells; smooth scrolling for feeds, chats, media-heavy content |

## How to Run the App

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run on iOS (Mac only)**

```bash
npx pod-install ios
npx react-native run-ios
```

4. **Run on Android**

```bash
npx react-native run-android
```

5. **Run on Web (if supported)**

```bash
npm start
# or
yarn start
```

### Notes

* Make sure you have **Node.js, React Native CLI, Android Studio / Xcode** installed.
* For **performance testing**, the app includes examples for **ScrollView, FlatList, FlashList**, and memoization techniques.
* You can modify the dataset size in the code to observe **virtualization and recycling behavior**.

## Contributing

Contributions are welcome! Feel free to submit pull requests or suggest new performance techniques to include.

## License

MIT License