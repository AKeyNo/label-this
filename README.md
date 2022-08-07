# Label This

A machine learning dataset compiler that allows users to label datasets created by others.

## Prerequisites

Make sure that you have installed [Git](https://git-scm.com/) and [Docker](https://docs.docker.com/get-docker/).

## Installation

In your favorite shell, type the following in order.

```
git clone https://github.com/AKeyNo/book-finder.git
cd label-this
```

Fill out the .env_example file and rename the file name to .env.
After this, type in the following commands.

```
docker build -t label-this .
docker-compose up --build --force-recreate
```

In Docker, open the shell for the main application (called label-this), and type the following command.

```
npx migrate dev
```

After running these commands, it will be on http://localhost:3000/.

## License

Book Finder is released under the MIT License. Check the [LICENSE](https://github.com/AKeyNo/label-this/blob/main/LICENSE) file for more information.
