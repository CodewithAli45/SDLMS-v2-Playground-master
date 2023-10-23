</div>
</div>
<div class="_toast__container">
    <div class="_toast__cell"></div>
</div>
</body>

<script defer src="{relative_path}/assets/nodebb.min.js?{config.cache-buster}"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
</script>

{{{each scripts}}}
<script defer type="text/javascript" src="{scripts.src}"></script>
{{{end}}}

<script>
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', prepareFooter);
    } else {
        prepareFooter();
    }

    function prepareFooter() {
        <!--IF useCustomJS-->
        {{customJS}}
        <!--ENDIF useCustomJS-->

        $(document).ready(function() {
            app.coldLoad();
        });
    }
</script>