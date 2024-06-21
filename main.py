# from fastapi import FastAPI, Request
# from fastapi.responses import HTMLResponse
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# from pydantic import BaseModel
# from typing import List
# import uvicorn

# app = FastAPI()

# templates = Jinja2Templates(directory="templates")

# class DataModel(BaseModel):
#     keywords: List[str]

# # Тестовые данные
# test_data = [
#     {"keywords": ["ааа"], "option": "Все слова", "places": ["resume_title"]},
#     {"keywords": ["ббб"], "option": "Любое из слов", "places": ["education", "skills"]}
# ]

# @app.get("/", response_class=HTMLResponse)
# async def read_root(request: Request):
#     return templates.TemplateResponse("1str.html", {"request": request})

# @app.post("/submit", response_class=HTMLResponse)
# async def submit_data(data: DataModel, request: Request):
#     test_data.append(data.model_dump())
#     return {"message": "Data received successfully"}

# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import Optional
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, PlainTextResponse

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")

# Главная страница (1str.html)
@app.get("/1str", response_class=HTMLResponse)
async def read_first_page(request: Request):
    return templates.TemplateResponse("1str.html", {"request": request})

# Страница для обработки ввода номера вакансии и перенаправления (обработка POST-запроса)
# @app.post("/submit-vacancy", response_class=HTMLResponse)
# async def submit_vacancy(request: Request, vacancy_number: str):
#     # vacancy_number = get_vacancy_number(vacancy_number)
#     # vacancy_description = get_vacancy_description(vacancy_number)  # Функция, которая получает описание вакансии по номеру

#     response = RedirectResponse(url=f"/2str/{vacancy_number}")
#     return response

# Страница 2 (2str.html) для отображения номера вакансии и описания
@app.post("/2str/{vacancy_number}", response_class=HTMLResponse)
async def read_second_page(request: Request, vacancy_number: str):
    vacancy_number = get_vacancy_number(vacancy_number)
    vacancy_description = get_vacancy_description(vacancy_number)

    return templates.TemplateResponse("2str.html", {"request": request, "vacancy_number": vacancy_number, "vacancy_description": vacancy_description})

# Пример функции для получения описания вакансии по номеру (замените на вашу реальную логику)

def get_vacancy_number(vacancy_number: str) -> str:
    # Здесь может быть логика для получения описания вакансии из базы данных или другого источника
    # Например:
    if vacancy_number == "talentforce":
        return "talentforce"
    else:
        return "Номер вакансии не найдено."


def get_vacancy_description(vacancy_number: str) -> str:
    # Здесь может быть логика для получения описания вакансии из базы данных или другого источника
    # Например:
    if vacancy_number == "talentforce":
        return "Описание вакансии: Изготовление сложных профильных деталей на фрезерных станках."
    else:
        return "Описание вакансии не найдено."


