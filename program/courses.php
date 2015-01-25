<?php
  $pageTitle = "Program | Courses";
  $ng_app = "courses";

  include "../header.php";
?>

<div>
    <h2>Program | Courses</h2>
</div>

<div role="main" id="courses" ng-controller="course_controller">
    <h3 id="schedule">Schedule</h3>


    <div ng-repeat="day in schedule">

        <h4 id="{{day.day}}" ng-bind="day.day"></h4>

        <div ng-if="isWide()">
            

            <div>
                <table class="course_schedule">
                    <thead>
                        <tr>
                            <td class="course_room_header">Room</td>
                            <td class="course_time">9:30 - 10:50</td>
                            <td class="course_time">11:30 - 12:50</td>
                            <td class="course_time">14:30 - 15:30</td>
                            <td class="course_time">16:40 - 17:50</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="room in day.rooms">
                            <td class="course_room" ng-bind="room.name"></td>
                            <td ng-repeat="time in room.time | schedule_desktop" ng-class="time.class">
                                <div ng-if="time.class=='course_entry'">
                                    <a href="#{{time.data.id}}" ng-bind="time.data.short_title"></a>
                                    <br/>
                                    <br/>
                                    <span class="course_code">(<span ng-bind="time.data.id"></span>)</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div> 

        </div>

        <div ng-if="!isWide()">

            <table class="m_course_schedule">
                <tbody>
                    <tr>
                        <td class="m_course_time">9:30</td>
                        <td ng-repeat="room in day.rooms" class="m_course_room">

                            <table class="m_course_room_table">
                                <tbody>
                                    <tr>
                                        <td class="m_course_room_name" ng-bind="room.name"></td>
                                    </tr>
                                    <tr>

                                    </tr>


                                </tbody>
                            </table>

                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
        

    </div>

<hr>

<h3>List of Courses</h3>

<div class="course-entry" ng-repeat="course in data" id="{{course.id}}">
    <div class="id" ng-bind="course.id"></div>
    <h4 class="title" ng-bind="course.paper_title"></h4>    
    <div class="instructors" ng-bind-html="course.instructor"></div>    
    <div class="candb" ng-bind-html="course.candb"></div>
    <div class="description" ng-bind-html="course.description"></div>
    <div class="go-back-up"><a href="#schedule">Go back up</a></div>
</div>


<h3>Courses Co-Chairs</h3>
<dl>
        <dt><strong><a href="mailto:courses@chi2015.acm.org">courses@chi2015.acm.org</a></strong></dt>
                <dd>
                        Regina Bernhaupt, <i>Ruwido</i>, <i>Austria</i>
                        <br>
                        Matt Jones, <i>Swansea University</i>, <i>United Kingdom</i>
                </dd>
</dl>

</div>
<?php
  include "../footer.php";
?>