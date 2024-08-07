/*
pom.xml
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>3.3.1</version>
        </dependency>

в конце <body> указываем путь к jquery
    <script src="webjars/jquery/3.3.1/jquery.min.js"></script>

и путь к нашему скрипту
    <script src="test2.js"></script>

для быстрого тестирования действий в консоли хрома можно использовать такую конструкцию:
a = function() { //какие то действия };
a()
так же в консоли хрома можно посмотреть подсказки доступных методов у объекта $().
    - здесь будет вывод объекта div
        a = function() {const div = $("#users"); console.log(div)};
        a()

    - здесь атритубу id установим значение 666, затем выведем в консоль значения атрибутов id, name
    a = function () {
        const v = $("<div id='rrr' name='www'></div>");
        v.attr('id', '666');
        console.log(v.attr('id'))
        console.log(v.attr('name'))
    };
    a()
*/

$(document).ready(function () {

    //самый простой тест того, что страница делает запрос к рест-контроллеру
    //для проверки обращения ставим брейкпоинт в рест-контроллере
    $.ajax("/rest")

    // показывает алерт с возвращенным значением
    $.ajax("/rest", {
        dataType: "json", //или, например, "text"
        success: function (msg) { //msg - то, что придет с сервера, респонз
            alert("Прибыли данные: " + msg);
        }
    })

    /*
        создает дивы, вложенные в <div id="users"></div> (<div id="users"></div> нужно создать в html-странице)
        созданные дивы можно увидеть в DevTools в Chrome на закладке Elements
        если msg - коллекция из 5 объектов, содержащих поле 'id', то там будет:
        <div id="users">
            <div>1</div>
            <div>3</div>
            <div>6</div>
            <div>7</div>
            <div>12</div>
        </div>
        при просмотре исходного кода страницы эти добавленные дивы видны не будут!
    */
    $.ajax("/rest", {
        dataType: "json",
        success: function (msg) {
            const div = $("#users");
            msg.forEach(function (el) {
                $("<div></div>").text(el.id).appendTo(div);
            })
        }
    })

    /*
        пример удаления
        в html-странице должен быть создан <button type="button" id="delete" name="id" value="1">delete</button>
    */
    const buttonDelete = $("#delete");
    buttonDelete.click(
        function () {
            $.ajax("/rest", {
                method: "DELETE",
                data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                dataType: "text",
                success: function (msg) {
                    $("#users")
                        .find("#" + msg) //ищем div с id=1
                        .remove();

                }
            })
        }
    )

    /*
    пример редактирования
    в html-странице должен быть создан:
    <form>
        <input type="text" id="login" name="login" value="u1" />
        <input type="text" name="password" value="u1" />
        <input type="text" name="email" value="u1" />

        <button type="button" id="edit" name="id" value="1">edit</button>
    </form>


    */
    const buttonEdit = $("#edit");
    buttonEdit.click(
        function () {
            $.ajax("/rest", {
                method: "" +
                    "",
                data:
                    {
                        id: $(this).attr("value"),//в rest-контроллер будет передан id=1 (см. value из тэга button выше)
                        login: $(this).parent().find("#login").attr("value") //в rest-контроллер будет передан login=u1 (см. value из тэга input выше)
                    },
                dataType: "text",
                success: function (msg) {
                    $("#users")
                        .find("#" + msg) //ищем div
                        .text(";;;"); //изменяем текст

                }
            })
        }
    )


})
