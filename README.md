Вот тебе заготовка красивого README на английском, оформленная так, чтобы и запуск проекта, и работа с ним были понятны:

---

# Quiz Builder

A full-stack application for creating, listing, and managing quizzes.
The backend is built with **NestJS + Prisma + PostgreSQL**, and the frontend is a **React + Vite** app served with Nginx inside Docker.

---

## 🚀 Getting Started

### 1. Start the Backend (Docker)

```bash
cd backend
docker compose up -d --build
docker compose logs -f backend
```

Once running:

* **Swagger UI:** [http://localhost:4000/docs](http://localhost:4000/docs)
* **OpenAPI JSON:** [http://localhost:4000/docs-json](http://localhost:4000/docs-json)

---

### 2. Start the Frontend (Docker)

```bash
cd ../frontend
docker build -t my-react-app:prod .
docker run -d --name my-react -p 5173:80 my-react-app:prod
```

Frontend will be available at: [http://localhost:5173/](http://localhost:5173/)

---

## 📖 How to Use

### Navigation

In the **top-right corner of the app**, you will find **two main buttons**:

1. **Create** – opens the quiz creation page.

    * Here you can enter a quiz title.
    * Add questions of three types:

        * **Boolean (True/False)** – comes with two predefined options.
        * **Input (short text)** – requires a free-text answer.
        * **Checkbox (multiple correct)** – you can add as many options as needed.
    * You can remove questions or options at any time.

2. **Quizzes** – opens the list of all saved quizzes.

    * Each quiz row has a **delete button on the left** to remove it.
    * Clicking on a quiz title will navigate you to the quiz details page.

---

## 🛠️ Tech Stack

* **Backend:** NestJS, Prisma, PostgreSQL
* **Frontend:** React, Vite, TailwindCSS
* **Containerization:** Docker, Docker Compose
* **API Docs:** Swagger (OpenAPI 3.0)

---

## 🧩 Features

* Create new quizzes with different question types.
* View a list of existing quizzes.
* Delete quizzes with a single click.
* Automatic API documentation via Swagger.

---

## 📝 Example Workflow

1. Click **Create** in the top-right menu.
2. Fill in the quiz title.
3. Add your questions and options.
4. Save the quiz.
5. Go to **Quizzes** to see it in the list.
6. From the list, you can either **delete** it or **open** it by clicking on the quiz name.

---

