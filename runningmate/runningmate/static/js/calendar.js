// Date 객체 생성
let date = new Date(); //오늘 날짜
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // year-month 채우기
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // Dates 기본 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);

  // Dates 정리
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";

    dates[
      i
    ] = `<div class="date"><span class="${condition}">${date}</span></div>`;
  });

  // Dates 그리기
  document.querySelector(".dates").innerHTML = dates.join("");
};

renderCalendar();

const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};




function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var csrftoken = getCookie("csrftoken");
function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  },
});


function contextToJson(context) {
  const context_to_string = JSON.stringify(context);
  const string_to_json = JSON.parse(context_to_string);
  return string_to_json; 
}
document.querySelectorAll(".date").forEach((date) => {
  date.addEventListener("click", () => {
    let dateNum = date.childNodes[0].innerText;
    $.ajax({
      type: "POST",
      url: "/showevent",
      data: JSON.stringify(dateNum),
      success: function (context) {
        let object = contextToJson(context);
        let status = object.status;
        if(status == "exist1"){
          let title1 = object.title1;
          let body1 = object.body1;
          let starttime1 = object.starttime1;
          let endtime1 = object.endtime1;
          let place1 = object.place1;
          let color1 = object.color1;
          // schedule_1.innerHTML = "<p>" + title1 + "<br>" + datetime1 +  "<br>" + place1 + "</p>";
          cal_title.innerHTML = title1;
          cal_title.style.color =color1;
          cal_body.innerHTML = body1;
          cal_time_place.innerHTML = starttime1 + "~" + endtime1 + "/" + place1;
          schedule_2.innerHTML = "<div id = 'no_schedule'>아직 등록된 일정이 없어요</div>";
          
        } 
        else if (status == "exist2") {
          let title1 = object.title1;
          let body1 = object.body1;
          let starttime1 = object.starttime1;
          let endtime1 = object.endtime1;
          let place1 = object.place1;
          let color1 = object.color1;
          // schedule_1.innerHTML = "<p>" + title1 + "<br>" + datetime1 +  "<br>" + place1 + "</p>";
          cal_title.innerHTML = title1;
          cal_body.innerHTML = body1;
          cal_time_place.innerHTML = starttime1 + "~" + endtime1 + "/" + place1;
          cal_title.style.color =color1;
          // document.getElementsByClassName("cal_friend").style.backgroundColor=color1;
          let title2 = object.title2;
          let body2 = object.body2;
          let starttime2 = object.starttime2;
          let endtime2 = object.endtime2;
          let place2 = object.place2;
          let color2 = object.color2;
          cal_title2.innerHTML = title2;
          cal_body2.innerHTML = body2;
          cal_time_place2.innerHTML = starttime2 + "~" + endtime2 + "/" + place2;
          ca2_title.style.color =color2;
          // document.getElementsByClassName("cal_friend2").style.backgroundColor=color2;
          // schedule_2.innerHTML = "<p>" + title2 + "<br>" + datetime2 +  "<br>" + place2 + "</p>";
          "cal_title2".innerHTML = title2;
          "cal_body2".innerHTML = body2;
          // document.getElementById("cal_time_place").innerHTML = starttime2 + "~" + endtime2 + "/" + place2;
        }
        else {
          schedule_1.innerHTML = "<div id = 'no_schedule'>아직 등록된 일정이 없어요</div>";
          schedule_2.innerHTML = "<div id = 'no_schedule'>아직 등록된 일정이 없어요</div>";
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(
          xhr.status + ": " + xhr.responseText
        );
      },
    });
  });
});





const today = new Date();
if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
  for (let date of document.querySelectorAll(".this")) {
    if (+date.innerText === today.getDate()) {
      date.classList.add("today");
      break;
    }
  }
}

